---
title: "Genocs Library 9.0"
description: "NuGet package reference for Genocs Library v9.0—Core, Web API, messaging, persistence, auth, sagas, and tooling."
lead: "Install and configure Genocs packages on .NET 8, 9, or 10. Use the links below to jump to each package guide."
date: 2026-03-21T15:40:19+02:00
lastmod: 2026-04-04T15:53:29Z
draft: false
images: []
menu:
  docs:
    identifier: "docs-9"
    name: "Version 9.0"
    parent: ""
weight: 1
---

Genocs Library **v9.0** is the current documentation line. Each page summarizes a single NuGet package: **when to use it**, **how to install it**, and **which settings and extension points matter** at runtime.

For conceptual overviews (for example JWT options or logging sinks), see the **[Library](/library/)** section. For templates and the CLI, see **[Getting started](/introduction/getting-started/)** and **[CLI](/cli/)**.

## Packages in this version

### Core, web, and API

| Package | Role |
| -------- | ---- |
| [Genocs.Common](/docs/9.0/packages/genocs.common/) | Shared primitives and helpers |
| [Genocs.Core](/docs/9.0/packages/genocs.core/) | Host bootstrap, CQRS wiring, `IGenocsBuilder` |
| [Genocs.Http](/docs/9.0/packages/genocs.http/) | HTTP client and resiliency |
| [Genocs.Logging](/docs/9.0/packages/genocs.logging/) | Serilog-based logging integration |
| [Genocs.WebApi](/docs/9.0/packages/genocs.webapi/) | ASP.NET Core integration for Genocs services |
| [Genocs.WebApi.CQRS](/docs/9.0/packages/genocs.webapi.cqrs/) | CQRS endpoints and dispatch |
| [Genocs.WebApi.OpenApi](/docs/9.0/packages/genocs.webapi.openapi/) | OpenAPI / Swagger setup |

### Security and data

| Package | Role |
| -------- | ---- |
| [Genocs.Auth](/docs/9.0/packages/genocs.auth/) | Authentication and JWT-related integration |
| [Genocs.Persistence.MongoDB](/docs/9.0/packages/genocs.persistence.mongodb/) | MongoDB persistence adapters |

### Messaging and sagas

| Package | Role |
| -------- | ---- |
| [Genocs.Messaging](/docs/9.0/packages/genocs.messaging/) | Messaging abstractions and bus helpers |
| [Genocs.Messaging.Outbox](/docs/9.0/packages/genocs.messaging.outbox/) | Outbox pattern and background processing |
| [Genocs.Messaging.Outbox.MongoDB](/docs/9.0/packages/genocs.messaging.outbox.mongodb/) | MongoDB storage for outbox |
| [Genocs.Messaging.RabbitMQ](/docs/9.0/packages/genocs.messaging.rabbitmq/) | RabbitMQ transport |
| [Genocs.Saga](/docs/9.0/packages/genocs.saga/) | Saga orchestration |
| [Genocs.Saga.Integrations.MongoDB](/docs/9.0/packages/genocs.saga.integrations.mongodb/) | MongoDB saga state |
| [Genocs.Saga.Integrations.Redis](/docs/9.0/packages/genocs.saga.integrations.redis/) | Redis saga state |

---

**Other versions:** [View all library doc versions](/library/) · **[Site home](/)**.
