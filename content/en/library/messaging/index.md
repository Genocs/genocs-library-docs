---
title: "Messaging"
description: "Publish and subscribe commands and events through Genocs messaging abstractions; add RabbitMQ, outbox, or other transports as NuGet packages."
lead: "Start with Genocs.Messaging, then add a transport (RabbitMQ, outbox, and so on) and wire dispatch bridges on `IGenocsBuilder`."
date: 2023-05-13T15:40:19+02:00
lastmod: 2026-04-04T16:07:01Z
draft: false
images: []
menu:
  library:
    identifier: "messaging"
    name: "Messaging"
    parent: "library"
weight: 7
toc: true
---

### Overview

The messaging stack centers on **`Genocs.Messaging`**: contracts for publishing and subscribing to messages, plus helpers that connect CQRS-style dispatching to the bus. **A transport package is required** at runtime (for example RabbitMQ). Optional patterns such as the **outbox** use additional packages for durable send/receive.

Typical pieces:

- **`IBusPublisher` / `IBusSubscriber`** — send and receive messages through the abstraction.
- **CQRS bridges** — register command/event dispatch so handlers and the bus stay aligned.
- **Transport providers** — RabbitMQ, outbox storage, saga integrations, and so on (see [versioned package docs](/docs/9.0/)).

### Installation

Add the core messaging package:

```bash
dotnet add package Genocs.Messaging
```

Then add at least one **transport or integration** package (for example RabbitMQ or outbox) from the [v9.0 package list](/docs/9.0/).

### Dependencies

- **Genocs.Core** — host and builder integration.
- A **concrete transport** (for example `Genocs.Messaging.RabbitMQ`) for real broker connectivity.

### Usage

Use `IGenocsBuilder` extensions from your packages (for example `AddServiceBusCommandDispatcher()` / `AddServiceBusEventDispatcher()`) and register the transport-specific services. Configuration lives with the transport (`rabbitmq`, `outbox`, and so on—not on `Genocs.Messaging` alone).

## Reference documentation

For exact APIs, configuration tables, and troubleshooting, use the **v9.0** package guides:

| Topic | Package |
| ----- | ------- |
| Core abstractions and CQRS bridges | [Genocs.Messaging](/docs/9.0/packages/genocs.messaging/) |
| RabbitMQ | [Genocs.Messaging.RabbitMQ](/docs/9.0/packages/genocs.messaging.rabbitmq/) |
| Outbox | [Genocs.Messaging.Outbox](/docs/9.0/packages/genocs.messaging.outbox/) |
| Outbox + MongoDB | [Genocs.Messaging.Outbox.MongoDB](/docs/9.0/packages/genocs.messaging.outbox.mongodb/) |
| Sagas | [Genocs.Saga](/docs/9.0/packages/genocs.saga/) and related integration packages |

---

**Related:** [CQRS](/library/cqrs/) · [All documentation versions](/library/)
