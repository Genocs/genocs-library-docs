---
title: "Genocs Library"
description: "Documentation for Genocs Library—NuGet packages, CLI, and templates for building cloud-ready .NET microservices with Clean Architecture."
lead: "Composable libraries for hosting, HTTP, CQRS, messaging, persistence, and observability—plus optional templates and a CLI to scaffold solutions."
sub: "Open-source libraries, CLI, and templates for enterprise .NET"
date: 2023-05-13 09:17:27+02:00
lastmod: 2026-04-04T15:53:29Z
draft: false
images: []
---

```mermaid
sequenceDiagram
    participant Client as Client (Blazor/Web)
    participant API as Genocs.WebApi
    participant Core as Genocs.Core (Application)
    participant DB as Genocs.Persistence
    participant Broker as Genocs.Messaging

    Client->>API: HTTP POST /api/v1/orders
    API->>Core: Dispatch Command (MediatR)
    Core->>DB: Persist Entity (MongoDB/PostgreSQL)
    DB-->>Core: Success
    Core->>Broker: Publish OrderCreatedEvent
    Broker-->>Core: Acknowledged
    Core-->>API: Command Result
    API-->>Client: 201 Created
```
