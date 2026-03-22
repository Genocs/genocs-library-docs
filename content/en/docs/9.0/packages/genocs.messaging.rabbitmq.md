---
title: "Genocs.Messaging.RabbitMQ"
description: "Genocs.Messaging.RabbitMQ — Agent Reference Documentation"
lead: "Genocs.Messaging.RabbitMQ — Agent Reference Documentation"
date: 2026-03-21T15:40:19+02:00
lastmod: 2026-03-22T14:49:10Z
draft: false
images: []
menu:
  docs:
    identifier: "genocs-messaging-rabbitmq"
    name: "Genocs.Messaging.RabbitMQ"
    parent: "docs-9-packages"
weight: 9
---

## Consumer Mode for Agents

- Assume package is installed from NuGet.
- Do not rely on repository source code access.
- Prefer stable public APIs and extension methods documented here.
- If behavior is uncertain, fail safely and request config/package version details.

## Purpose

Genocs.Messaging.RabbitMQ implements the Genocs messaging abstractions over RabbitMQ. It wires `IBusPublisher` and `IBusSubscriber` to a real AMQP broker, providing exchange/queue convention management, configurable retry policies, dead-letter routing, TLS/SSL support, plugin hooks, and a background consumer hosted service — all driven by a single `rabbitmq` configuration section.

## Quick Facts

| Key | Value |
|---|---|
| Package | `Genocs.Messaging.RabbitMQ` |
| Target frameworks | `net10.0`, `net9.0`, `net8.0` |
| Primary role | RabbitMQ transport provider for Genocs messaging |
| Typical startup APIs | `AddRabbitMQAsync`, `UseRabbitMQ` |

## Install

```bash
dotnet add package Genocs.Messaging.RabbitMQ
```

## Minimal Integration Recipe (Program.cs)

```csharp
using Genocs.Core.Builders;
using Genocs.Messaging.RabbitMQ;

var builder = WebApplication.CreateBuilder(args);
IGenocsBuilder gnxBuilder = builder.AddGenocs();

await gnxBuilder.AddRabbitMQAsync();
gnxBuilder.Build();

var app = builder.Build();
app.UseRabbitMQ();
app.Run();
```

## Configuration

Use the `rabbitmq` section in `appsettings.json`.

```json
{
	"rabbitmq": {
		"connectionName": "orders-api",
		"hostNames": ["localhost"],
		"port": 5672,
		"virtualHost": "/",
		"username": "guest",
		"password": "guest",
		"requestedHeartbeat": "00:01:00",
		"requestedConnectionTimeout": "00:00:30",
		"socketReadTimeout": "00:00:30",
		"socketWriteTimeout": "00:00:30",
		"continuationTimeout": "00:00:20",
		"handshakeContinuationTimeout": "00:00:10",
		"networkRecoveryInterval": "00:00:05",
		"messageProcessingTimeout": "00:00:30",
		"requestedChannelMax": 0,
		"requestedFrameMax": 0,
		"conventionsCasing": "snake_case",
		"retries": 3,
		"retryInterval": 5,
		"messagesPersisted": true,
		"spanContextHeader": "span_context",
		"maxProducerChannels": 16,
		"requeueFailedMessages": false,
		"context": {
			"enabled": true,
			"header": "context"
		},
		"exchange": {
			"name": "genocs",
			"type": "topic",
			"declare": true,
			"durable": true,
			"autoDelete": false
		},
		"queue": {
			"template": "{service}/{message}",
			"declare": true,
			"durable": true,
			"exclusive": false,
			"autoDelete": false
		},
		"deadLetter": {
			"enabled": true,
			"prefix": "dlx.",
			"suffix": ".dead",
			"declare": true,
			"durable": true,
			"exclusive": false,
			"autoDelete": false,
			"ttl": 60000
		},
		"ssl": {
			"enabled": false,
			"serverName": null,
			"certificatePath": null,
			"caCertificatePath": null,
			"x509IgnoredStatuses": []
		},
		"qos": {
			"prefetchSize": 0,
			"prefetchCount": 10,
			"global": false
		},
		"conventions": {
			"messageAttribute": {
				"ignoreExchange": false,
				"ignoreRoutingKey": false,
				"ignoreQueue": false
			}
		},
		"logger": {
			"enabled": true,
			"logConnectionStatus": true,
			"logMessagePayload": false
		}
	}
}
```

| Setting | Type | Description |
|---|---|---|
| `connectionName` | `string` | Friendly connection name visible on the RabbitMQ server. |
| `hostNames` | `string[]` | One or more RabbitMQ broker hostnames. |
| `port` | `int` | AMQP port; `0` leaves the driver default. |
| `virtualHost` | `string` | Virtual host. Defaults to `/`. |
| `username` | `string` | Broker username. |
| `password` | `string` | Broker password. |
| `requestedHeartbeat` | `TimeSpan` | Requested heartbeat interval. |
| `requestedConnectionTimeout` | `TimeSpan` | Connection timeout. |
| `socketReadTimeout` | `TimeSpan` | Socket read timeout. |
| `socketWriteTimeout` | `TimeSpan` | Socket write timeout. |
| `conventionsCasing` | `string` | Naming convention for generated exchange, queue, and routing names. |
| `retries` | `int` | Maximum message processing retry attempts. |
| `retryInterval` | `int` | Seconds between retries. |

## Decision Matrix For Agents

| Goal | Preferred API | Why |
|---|---|---|
| Register RabbitMQ transport | `await gnxBuilder.AddRabbitMQAsync()` | Wires `IBusPublisher`, `IBusSubscriber`, and all broker services |
| Start the background consumer | `app.UseRabbitMQ()` | Activates the hosted subscriber processing pipeline |
| Inject a custom serializer | `AddRabbitMQAsync(..., serializer: mySerializer)` | Replaces the default Newtonsoft.Json payload serializer |
| Register processing plugins | `AddRabbitMQAsync(..., plugins: r => r.Add<MyPlugin>())` | Adds pre/post-processing hooks via `IRabbitMqPlugin` |

## Behavior Notes / Constraints

- `AddRabbitMQAsync` is asynchronous and must be awaited; startup throws `ArgumentException` if `hostNames` is null or empty.
- `UseRabbitMQ` must be called after `builder.Build()` to activate the subscriber background service.
- Conventions are derived from exchange and queue options in the `rabbitmq` section.

## Public Capability Map

| Capability | Surface |
|---|---|
| Register RabbitMQ transport and services | `AddRabbitMQAsync` on `IGenocsBuilder` |
| Activate subscriber background service | `UseRabbitMQ` on `IApplicationBuilder` |
| Publish messages to the broker | `IBusPublisher` (resolved from DI) |
| Subscribe to broker messages | `IBusSubscriber` (resolved from DI) |

## Dependencies

- `Genocs.Messaging`
- `RabbitMQ.Client`
- `Polly`
- `Newtonsoft.Json`

## Troubleshooting

1. Service fails to start with a broker connection error.
Fix: Verify `rabbitmq.hostNames`, `username`, `password`, and that the broker is reachable on the configured port.
2. Messages are published successfully but no handlers execute.
Fix: Confirm `UseRabbitMQ()` is called after `builder.Build()` and that subscriber registrations are in place before the app starts.
3. Messages are retried too many times or move to dead-letter unexpectedly.
Fix: Review `retries`, `retryInterval`, `requeueFailedMessages`, and `deadLetter.enabled` in the `rabbitmq` configuration section.
