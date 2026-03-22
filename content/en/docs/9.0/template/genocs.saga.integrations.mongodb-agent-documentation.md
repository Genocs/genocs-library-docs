---
title: "Genocs.Saga.Integrations.MongoDB"
description: "Genocs.Saga.Integrations.MongoDB — Agent Reference Documentation"
lead: "Genocs.Saga.Integrations.MongoDB — Agent Reference Documentation"
date: 2026-03-21T15:40:19+02:00
lastmod: 2026-03-22T14:49:10Z
draft: false
images: []
---

## Consumer Mode for Agents

- Assume package is installed from NuGet.
- Do not rely on repository source code access.
- Prefer stable public APIs and extension methods documented here.
- If behavior is uncertain, fail safely and request config/package version details.

## Purpose

Genocs.Saga.Integrations.MongoDB replaces the default in-memory saga persistence in `Genocs.Saga` with durable MongoDB-backed storage for both saga state and saga logs. It exposes two `UseMongoPersistence` extension methods on `ISagaBuilder` — one that reads from `IConfiguration` and one that accepts an explicit `SagaMongoOptions` object.

## Quick Facts

| Key | Value |
|---|---|
| Package | `Genocs.Saga.Integrations.MongoDB` |
| Target frameworks | `net10.0`, `net9.0`, `net8.0` |
| Primary role | MongoDB-backed saga state and log persistence |
| Typical startup APIs | `AddSaga` + `UseMongoPersistence` |

## Install

```bash
dotnet add package Genocs.Saga.Integrations.MongoDB
```

## Minimal Integration Recipe (Program.cs)

```csharp
using Genocs.Saga;
using Genocs.Saga.Integrations.MongoDB;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSaga(saga =>
{
    saga.UseMongoPersistence(builder.Configuration);
});

var app = builder.Build();
app.Run();
```

## Configuration

Use the `sagaMongo` section in `appsettings.json`.

```json
{
    "sagaMongo": {
        "enabled": true,
        "connectionString": "mongodb://localhost:27017",
        "database": "genocs_saga"
    }
}
```

| Setting | Type | Description |
|---|---|---|
| `connectionString` | `string` | MongoDB connection string for saga persistence. Required. |
| `database` | `string` | Database name for saga state and log collections. Required. |

## Dependencies

- `Genocs.Saga`
- `MongoDB.Driver`
- `Microsoft.Extensions.Configuration`

## Troubleshooting

1. Saga still behaves as if using in-memory persistence after adding this package.
Fix: Ensure `UseMongoPersistence` is called inside the `AddSaga(saga => { ... })` builder callback during startup.
2. Startup throws `SagaException` while loading saga Mongo settings.
Fix: Validate that `sagaMongo.connectionString` and `sagaMongo.database` are present and non-empty.
3. Compensation history is missing or unreadable after a deployment update.
Fix: Maintain backward compatibility in serialized saga message and state contracts across versions.
