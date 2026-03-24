---
title: "Genocs.Messaging.Outbox.MongoDB"
description: "Genocs.Messaging.Outbox.MongoDB — Agent Reference Documentation"
lead: "Genocs.Messaging.Outbox.MongoDB — Agent Reference Documentation"
date: 2026-03-21T15:40:19+02:00
lastmod: 2026-03-24T21:25:31Z
draft: false
images: []
menu:
  docs:
    identifier: "genocs-messaging-outbox-mongodb"
    name: "Genocs.Messaging.Outbox.MongoDB"
    parent: "packages"
weight: 8
toc: true
---

## Consumer Mode for Agents

- Assume package is installed from NuGet.
- Do not rely on repository source code access.
- Prefer stable public APIs and extension methods documented here.
- If behavior is uncertain, fail safely and request config/package version details.

## Purpose

`Genocs.Messaging.Outbox.MongoDB` provides MongoDB-backed durable storage for inbox/outbox records used by the base outbox runtime.

## Quick Facts

| Key               | Value                                                                             |
| ----------------- | --------------------------------------------------------------------------------- |
| Package           | `Genocs.Messaging.Outbox.MongoDB`                                                 |
| Target frameworks | `net10.0`, `net9.0`, `net8.0`                                                     |
| Primary role      | MongoDB durable outbox and inbox persistence                                      |
| Core entry points | `AddMessageOutbox(o => o.AddMongo())`, `IMessageOutbox`, `IMessageOutboxAccessor` |

## Install

```bash
dotnet add package Genocs.Messaging.Outbox.MongoDB
```

## Minimal Integration Recipe (Program.cs)

```csharp
using Genocs.Core.Builders;
using Genocs.Messaging.Outbox;
using Genocs.Messaging.Outbox.MongoDB;
using Genocs.Persistence.MongoDB.Extensions;

var builder = WebApplication.CreateBuilder(args);

IGenocsBuilder gnxBuilder = builder.AddGenocs();
gnxBuilder
    .AddMongo()
    .AddMessageOutbox(o => o.AddMongo());

gnxBuilder.Build();

var app = builder.Build();
app.Run();
```

## Configuration

This integration uses two sections together:

1. `outbox` from `Genocs.Messaging.Outbox`
2. `mongoDb` from `Genocs.Persistence.MongoDB`

```json
{
  "outbox": {
    "enabled": true,
    "intervalMilliseconds": 5000,
    "expiry": 3600,
    "inboxCollection": "inbox",
    "outboxCollection": "outbox",
    "type": "sequential",
    "disableTransactions": false
  },
  "mongoDb": {
    "connectionString": "mongodb://localhost:27017",
    "database": "genocs_outbox",
    "enableTracing": true,
    "seed": false,
    "setRandomDatabaseSuffix": false
  }
}
```

| Section   | Setting                | Type     | Description                                                      |
| --------- | ---------------------- | -------- | ---------------------------------------------------------------- |
| `outbox`  | `enabled`              | `bool`   | Enables the base outbox runtime.                                 |
| `outbox`  | `intervalMilliseconds` | `double` | Poll interval used to fetch unsent records.                      |
| `outbox`  | `expiry`               | `int`    | Enables cleanup of processed inbox/outbox records when positive. |
| `mongoDb` | `connectionString`     | `string` | MongoDB connection string used by the provider.                  |
| `mongoDb` | `database`             | `string` | Target database name.                                            |

## Decision Matrix For Agents

| Goal                                              | Preferred API                                          |
| ------------------------------------------------- | ------------------------------------------------------ |
| Keep outbox API and switch persistence to MongoDB | `AddMessageOutbox(o => o.AddMongo())`                  |
| Customize inbox and outbox collection names       | `outbox.inboxCollection` and `outbox.outboxCollection` |
| Enable record cleanup by expiry                   | `outbox.expiry`                                        |

## Dependencies

- `Genocs.Messaging.Outbox`
- `Genocs.Persistence.MongoDB`

## Troubleshooting

1. Pending records fail while rehydrating message payloads.
   Fix: Keep message contracts version-compatible and ensure required runtime types are loadable.
2. Processed records never expire.
   Fix: Set a positive `outbox.expiry` and confirm index creation permissions in MongoDB.
3. Inbox handling fails with Mongo session or transaction errors.
   Fix: Set `outbox.disableTransactions` to true when deployment topology does not support required transaction features.
