---
title: "Genocs.WebApi.CQRS"
description: "Genocs.WebApi.CQRS — Agent Reference Documentation"
lead: "Genocs.WebApi.CQRS — Agent Reference Documentation"
date: 2026-03-21T15:40:19+02:00
lastmod: 2026-03-22T14:49:10Z
draft: false
images: []
---

## Consumer Mode for Agents

- Assume package is installed from NuGet.
- Do not rely on repository source code access.
- Prefer stable public APIs and extension methods documented here.
- If behavior is uncertain, fail safely and request package version and configuration details.

## Purpose

`Genocs.WebApi.CQRS` connects CQRS dispatching to the Genocs WebApi endpoint flow and offers optional runtime command/event contract exposure.

## Quick Facts

| Key | Value |
|---|---|
| Package | `Genocs.WebApi.CQRS` |
| Target frameworks | `net10.0`, `net9.0`, `net8.0` |
| Primary role | CQRS endpoint dispatch bridge |
| Main APIs | `AddInMemoryDispatcher`, `UseDispatcherEndpoints`, `Dispatch`, `UsePublicContracts` |

## Install

```bash
dotnet add package Genocs.WebApi.CQRS
```

## Minimal Integration Recipe (Program.cs)

```csharp
using Genocs.Core.Builders;
using Genocs.WebApi;
using Genocs.WebApi.CQRS;

var builder = WebApplication.CreateBuilder(args);

IGenocsBuilder gnxBuilder = builder
    .AddGenocs()
    .AddWebApi()
    .AddInMemoryDispatcher();

gnxBuilder.Build();

var app = builder.Build();

app.UseDispatcherEndpoints(endpoints => endpoints
    .Post<CreateOrderCommand>("/orders")
    .Get<GetOrderQuery, OrderDto>("/orders/{id}"));

app.UsePublicContracts(attributeRequired: false, endpoint: "/_contracts");
app.Run();
```

## Dependencies

- `Genocs.WebApi`
- CQRS abstractions provided by Genocs packages in the host

## Troubleshooting

1. CQRS endpoints resolve but no command or query executes.
Fix: Register the underlying `ICommandDispatcher`, `IQueryDispatcher`, and `IEventDispatcher` services in DI.
2. `/_contracts` returns empty or incomplete results.
Fix: Ensure contract types are loaded at runtime and use the correct `attributeRequired` setting.
