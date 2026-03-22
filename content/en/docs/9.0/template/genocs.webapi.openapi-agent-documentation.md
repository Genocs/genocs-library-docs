---
title: "Genocs.WebApi.OpenApi"
description: "Genocs.WebApi.OpenApi — Agent Reference Documentation"
lead: "Genocs.WebApi.OpenApi — Agent Reference Documentation"
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

`Genocs.WebApi.OpenApi` adds OpenAPI document generation and UI hosting (Swagger UI or ReDoc) for Genocs-based Web API services.

## Quick Facts

| Key | Value |
|---|---|
| Package | `Genocs.WebApi.OpenApi` |
| Target frameworks | `net10.0`, `net9.0`, `net8.0` |
| Primary role | OpenAPI/Swagger integration for Genocs hosts |
| Main APIs | `AddOpenApiDocs` overloads and `UseOpenApiDocs` |

## Install

```bash
dotnet add package Genocs.WebApi.OpenApi
```

## Minimal Integration Recipe (Program.cs)

```csharp
using Genocs.Core.Builders;
using Genocs.WebApi.OpenApi;

var builder = WebApplication.CreateBuilder(args);

IGenocsBuilder gnxBuilder = builder
    .AddGenocs()
    .AddWebApi()
    .AddOpenApiDocs();

gnxBuilder.Build();

var app = builder.Build();
app.UseOpenApiDocs();
app.Run();
```

## Configuration

Use the `openapi` section.

```json
{
    "openapi": {
        "enabled": true,
        "reDocEnabled": false,
        "name": "v1",
        "title": "Orders API",
        "version": "1.0.0",
        "routePrefix": "docs"
    }
}
```

| Setting | Type | Description |
|---|---|---|
| `enabled` | `bool` | Enables OpenAPI service registration. |
| `reDocEnabled` | `bool` | Switches UI rendering from Swagger UI to ReDoc. |
| `routePrefix` | `string` | Base route for the JSON document and UI assets. |

## Dependencies

- `Genocs.WebApi`
- `Swashbuckle.AspNetCore.*`

## Troubleshooting

1. Swagger or ReDoc endpoints are missing.
Fix: Enable `openapi.enabled` and ensure `UseOpenApiDocs()` is called in the app pipeline.
2. Security authorization controls do not appear in UI.
Fix: Set `openapi.includeSecurity` to `true` and restart the service.
