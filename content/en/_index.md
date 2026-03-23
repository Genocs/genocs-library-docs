---
title : "Genocs Framework Documentation"
description: "Genocs Framework Documentation offers Templates with latest packages and services that your projects will ever need. We intend to provide Clean and Well structured Templates with top-notch quality following standard coding practices and Clean Architecture principles that makes your development experience seemless."
lead: "Genocs Framework Documentation offers Templates with latest packages and services that your projects will ever need. We intend to provide Clean and Well structured Templates with top-notch quality following standard coding practices and Clean Architecture principles that makes your development experience seemless."
sub: "Open-Source Framework for Enterprise Applications"
date: 2023-05-13 09:17:27+02:00
lastmod: 2026-03-23T21:39:47Z
draft: false
images: []
---

```mermaid
sequenceDiagram
    participant Client as Client (Blazor/Web)
    participant API as Genocs.WebApi
    participant Core as Genocs.Core (Application)
    participant DB as Genocs.Persistence
    participant Broker as Genocs.MessageBrokers

    Client->>API: HTTP POST /api/v1/orders
    API->>Core: Dispatch Command (MediatR)
    Core->>DB: Persist Entity (MongoDB/PostgreSQL)
    DB-->>Core: Success
    Core->>Broker: Publish OrderCreatedEvent
    Broker-->>Core: Acknowledged
    Core-->>API: Command Result
    API-->>Client: 201 Created
```