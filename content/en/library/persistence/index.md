---
title: "Persistence"
description: "MongoDB persistence and repositories for Genocs services—connection, repositories, and optional seeding from configuration."
lead: "Use Genocs.Persistence.MongoDB for MongoDB clients, databases, and repositories wired through the Genocs builder."
date: 2023-05-13T15:40:19+02:00
lastmod: 2026-04-04T16:07:01Z
draft: false
images: []
menu:
  library:
    identifier: "persistence"
    name: "Persistence"
    parent: "library"
weight: 10
toc: true
---

### Overview

**`Genocs.Persistence.MongoDB`** provides MongoDB connectivity and repository wiring for Genocs-based services: **`IMongoClient`**, **`IMongoDatabase`**, generic **`IMongoRepository<TEntity>`**, session support, and optional collection seeding—driven from a single **`mongoDb`** configuration section.

### Installation

```bash
dotnet add package Genocs.Persistence.MongoDB
```

### Dependencies

- **Genocs.Core**
- MongoDB driver (pulled in by the package as appropriate for the version you use)

### Usage

Extend **`IGenocsBuilder`** with Mongo registration helpers (for example **`AddMongoWithRegistration()`**) during application startup. See the **[Genocs.Persistence.MongoDB v9.0 reference](/docs/9.0/packages/genocs.persistence.mongodb/)** for a full **Program.cs** example, **`appsettings.json`** schema, and troubleshooting.

## Reference documentation

- **[Genocs.Persistence.MongoDB (v9.0)](/docs/9.0/packages/genocs.persistence.mongodb/)** — install recipe, configuration keys, and behavior notes.

---

**Related:** [Library](/library/) · [Choose a docs version](/library/)
