---
title: "Genocs Framework Documentation"
description: "Genocs Framework Documentation offers templates with the latest packages and services your projects need. We provide clean, well-structured templates with solid engineering practices and Clean Architecture principles that make your development experience seamless."
lead: "Genocs Framework Documentation offers templates with the latest packages and services your projects need. We provide clean, well-structured templates with solid engineering practices and Clean Architecture principles that make your development experience seamless."
sub: "Open-Source Framework for Enterprise Applications"
date: 2023-05-13 09:17:27+02:00
lastmod: 2026-04-04T15:26:42Z
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
