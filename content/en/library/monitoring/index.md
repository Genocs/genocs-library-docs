---
title : "Monitoring"
description: "Genocs Library is a collection of Enterprise Level Libraries and Boilerplates for Modern Web Applications that gets you started with premium application development in no-time!"
lead: ""
date: 2023-11-29T21:00:19+02:00
lastmod: 2023-11-29T21:00:19+02:00
draft: false
images: []
menu:
  library:
    identifier: "monitoring"
    name: "Monitoring"
    parent: "library"
weight: 1
toc: true
---

{{< img src="logo.png" >}}

### Overview
Adds logging and tracing capability, by default uses Azure Appinsights, Jaeger and Console tracing sistem. The system configure Masstransit with RabbitMQ and 
MongoDB tracing :

- Console
- Jaeger
- Azure AppInsights


### Installation

``` bash
dotnet add package Genocs.Monitoring
```

## Dependencies

- NONE

### Usage

Extend Program.cs -> use services and congiguration object instance. They are both available in ASP.NET Core framework.

``` cs
services.AddCustomOpenTelemetry(configuration);
```

### Options

`appSettings:serviceName` - sets the service name used by Jaeger.

`connectionStrings:applicationInsights` - sets the Azure Appinsights connection string. Null or empty to disable.

`monitoring:jaeger` - sets the jaeger url to be used. Null or empty to disable.


**appsettings.json**

``` json
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
