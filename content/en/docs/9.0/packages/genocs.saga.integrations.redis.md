---
title: "Genocs.Saga.Integrations.Redis"
description: "Genocs.Saga.Integrations.Redis — Agent Reference Documentation"
lead: "Genocs.Saga.Integrations.Redis — Agent Reference Documentation"
date: 2026-03-21T15:40:19+02:00
lastmod: 2026-03-24T21:25:31Z
draft: false
images: []
menu:
  docs:
    identifier: "genocs-saga-integrations-redis"
    name: "Genocs.Saga.Integrations.Redis"
    parent: "packages"
weight: 12
toc: true
---

## Consumer Mode for Agents

- Assume package is installed from NuGet.
- Do not rely on repository source code access.
- Prefer stable public APIs and extension methods documented here.
- If behavior is uncertain, fail safely and request package version and configuration details.

## Purpose

`Genocs.Saga.Integrations.Redis` replaces default in-memory saga persistence with Redis-backed saga state and saga log storage for distributed deployments.

## Quick Facts

| Key               | Value                                                                                                              |
| ----------------- | ------------------------------------------------------------------------------------------------------------------ |
| Package           | `Genocs.Saga.Integrations.Redis`                                                                                   |
| Target frameworks | `net10.0`, `net9.0`, `net8.0`                                                                                      |
| Primary role      | Redis persistence provider for saga state and logs                                                                 |
| Main APIs         | `UseRedisPersistence(ISagaBuilder, SagaRedisOptions)`, `UseRedisPersistence(ISagaBuilder, string, IConfiguration)` |

## Install

```bash
dotnet add package Genocs.Saga.Integrations.Redis
```

## Minimal Integration Recipe (Program.cs)

```csharp
using Genocs.Saga;
using Genocs.Saga.Integrations.Redis;
using Genocs.Saga.Integrations.Redis.Configurations;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSaga(saga =>
{
    saga.UseRedisPersistence(new SagaRedisOptions
    {
        Configuration = "localhost:6379",
        InstanceName = "genocs-saga"
    });
});

var app = builder.Build();
app.Run();
```

## Configuration

```json
{
  "sagaRedis": {
    "enabled": true,
    "configuration": "localhost:6379",
    "instanceName": "genocs-saga"
  }
}
```

| Setting         | Type     | Description                                                     |
| --------------- | -------- | --------------------------------------------------------------- |
| `configuration` | `string` | Redis connection string passed to `AddStackExchangeRedisCache`. |
| `instanceName`  | `string` | Cache key prefix used for saga state and log entries.           |

## Dependencies

- `Genocs.Saga`
- `Microsoft.Extensions.Caching.StackExchangeRedis`
- `Newtonsoft.Json`

## Troubleshooting

1. Saga data is not shared across service instances.
   Fix: Verify Redis connectivity and ensure `UseRedisPersistence(...)` is called in startup.
2. Startup throws during Redis settings binding.
   Fix: Validate the configuration section value format and required fields (`configuration`, `instanceName`).
