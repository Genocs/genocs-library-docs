---
title: "Monitoring"
description: "Genocs.Monitoring—OpenTelemetry-style setup with Jaeger, Application Insights, and MassTransit tracing hooks."
lead: "Configure `AddCustomOpenTelemetry`, service name, and connection strings for traces and downstream messaging visibility."
date: 2023-11-29T21:00:19+02:00
lastmod: 2026-04-04T16:07:01Z
draft: false
images: []
menu:
  library:
    identifier: "monitoring"
    name: "Monitoring"
    parent: "library"
weight: 9
toc: true
---

### Overview

Adds logging and tracing capability. By default it uses Azure Application Insights, Jaeger, and console tracing. The system configures MassTransit with RabbitMQ and
MongoDB tracing:

- Console
- Jaeger
- Azure AppInsights

### Installation

```bash
dotnet add package Genocs.Monitoring
```

## Dependencies

- NONE

### Usage

Extend Program.cs -> use services and configuration object instance. They are both available in ASP.NET Core framework.

```cs
services.AddCustomOpenTelemetry(configuration);
```

### Options

`appSettings:serviceName` - sets the service name used by Jaeger.

`connectionStrings:applicationInsights` - sets the Azure Application Insights connection string. Null or empty to disable.

`monitoring:jaeger` - sets the jaeger url to be used. Null or empty to disable.

**appsettings.json**

```json
  "AppSettings": {
    "ServiceName": "Service WebApi",
  },
  "ConnectionStrings": {
    "ApplicationInsights": "InstrumentationKey=<<your instrumentation key>>;IngestionEndpoint=https://westeurope-5.in.applicationinsights.azure.com/;LiveEndpoint=https://westeurope.livediagnostics.monitor.azure.com/"
  },
  "Monitoring": {
    "Jaeger": "localhost"
  }
```

## Reference documentation

There is no separate **`Genocs.Monitoring`** page in the current **[v9.0 package index](/docs/9.0/)**; telemetry and logging overlap is covered in **[Genocs.Logging (v9.0)](/docs/9.0/packages/genocs.logging/)**. **[Library versions](/library/)** for other releases.
