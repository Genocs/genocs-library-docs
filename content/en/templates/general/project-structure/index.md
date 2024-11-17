---
title: "Project Structure"
description: "Here is how the .NET Microservice Template is structured."
lead: "Here is how the .NET Microservice Template is structured."
date: 2023-05-13 09:17:27+02:00
lastmod: 2023-05-13 09:17:27+02:00
draft: false
images: []
menu:
  templates:
    identifier: "general-project-structure"
    name: "Project Structure"
    parent: "general"
weight: 6
toc: true
---

Genocs Library's .NET Microservice Template is based on Clean Architecture. In other words, Onion / Hexagonal Architecture. [Read about the advantages and principles of Onion Architecture here →](https://blog.genos.com/blog/onion-architecture-in-aspnet-core/)

## General Structure

This means that the entire solution is built in such a way that it can be scaled, maintained easily by teams of developers. This WebAPI Solution Primarily consists of the following .csproj files.

``` bash
├── src
│   ├── Application.csproj
│   ├── Shared.csproj
│   ├── Domain.csproj
|   ├── Infrastructure.csproj
|   ├── WebApi.csproj
```

The idea is to build a very loosely coupled architecture following best practices and packages. Let's see in brief what responsibilities each of these projects handle.

### Host

Contains the API Controllers and Startup Logic including ASP.NET Core Container setup. This is the entry point of the application. Also, other static files like the logs, localization jsons, images, email templates and most importantly the configuration files live under this project.

With the release of 0.0.5-rc, the appSettings.json is further split into variable sub-setting like database.json, security.json and so on for better modularity and organization. You can find these new JSONs under the Configurations folder of the Host project.

```bash
├── Host
|   ├── Configurations
|   ├── Controllers
|   ├── Email Templates
|   ├── Extensions
|   ├── Files
│   |   ├── Images
│   |   └── Documents
|   ├── Localization
|   ├── Logs
|   └── appsettings.json
```

Note that the *Host* project depends on
- Application
- Infrastructure
- Migration Projects

### Application

This is one of the projects in the Core Folder apart from the Domain Project. Here you get to see Abstract Classes and Interfaces that are inherited and implemented in the Infrastructure Project. This refers to Dependency Inversion.

``` bash
├── Core
|   ├── Application
|   |   ├── Auditing
|   |   ├── Catalog
|   |   ├── Common
|   |   ├── Dashboard
|   |   ├── Identity
|   |   └── Multitenancy

```

The folders and split at the top level Feature-wise. Meaning, it now makes it easier for developers to understand the folder structure. Each of the feature folders like Catalog will have all the files related to it's scope including validators, dtos, interfaces and so on.

Thus everything related to a feature will be found directly under that Feature folder.

In cases where there are less number of classes / interfaces associated with a feature, all of these classes are put directly under the root of the feature folder. Only when the complexity of the feature increases, it is recommended to separate the classes by their type.

Note that the *Application* project depends only on the Core projects which are `Shared` and `Domain`.

### Domain

Note that the *Domain* project does not depend on any other project other than the `Shared` project.

As per Clean Architecture principles, the Core of this Solution i.e, Application and Domain projects do not depend on any other projects. This helps achieve Dependency Inversion (The 'D' Principle of 'SOLID').

