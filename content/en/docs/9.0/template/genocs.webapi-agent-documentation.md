---
title: "Genocs.WebApi"
description: "Genocs.WebApi — Agent Reference Documentation"
lead: "Genocs.WebApi — Agent Reference Documentation"
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

`Genocs.WebApi` provides API bootstrap conventions, endpoint composition helpers, request/response utilities, and optional exception-to-response middleware for ASP.NET Core hosts.

## Quick Facts

| Key | Value |
|---|---|
| Package | `Genocs.WebApi` |
| Target frameworks | `net10.0`, `net9.0`, `net8.0` |
| Primary role | Web API conventions and endpoint DSL |
| Main APIs | `AddWebApi`, `UseEndpoints`, `AddErrorHandler<T>`, `UseErrorHandler`, `UseAllForwardedHeaders` |

## Install

```bash
dotnet add package Genocs.WebApi
```

## Minimal Integration Recipe (Program.cs)

```csharp
using Genocs.Core.Builders;
using Genocs.WebApi;

IGenocsBuilder gnxBuilder = builder.AddGenocs();
gnxBuilder.AddWebApi();
gnxBuilder.Build();

var app = builder.Build();

app.UseEndpoints(endpoints =>
{
    endpoints.Get("/health", async ctx => await ctx.Response.Ok(new { status = "ok" }));
});

app.Run();
```

## Configuration

`Genocs.WebApi` exposes a minimal `webApi` section through `WebApiOptions`.

```json
{
    "webApi": {
        "bindRequestFromRoute": true
    }
}
```

| Setting | Type | Description |
|---|---|---|
| `bindRequestFromRoute` | `bool` | When enabled, request-binding helpers can hydrate request objects from route values in addition to the request body. |

## Dependencies

- `Genocs.Core`
- ASP.NET Core shared framework (`Microsoft.AspNetCore.App`)

## Troubleshooting

1. Endpoints do not respond after startup.
Fix: Ensure `UseEndpoints(...)` is called after `builder.Build()` and before `app.Run()`.
2. Unhandled exceptions return default responses.
Fix: Register a mapper with `AddErrorHandler<T>()` and add `UseErrorHandler()` to the pipeline.
