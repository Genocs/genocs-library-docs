---
title: "OpenAPI"
description: "How to implement logging tracing and monitoring by using OpenTelementry."
lead: "Genocs's Web API and OpenTelelemetry."
date: 2021-08-24T11:40:05+05:30
lastmod: 2021-10-28T10:07:45+05:30
draft: false
images: []
menu:
  dotnet-templates:
    identifier: "open-telementry"
    name: "OpenTelemetry"
    parent: "fundamentals"
weight: 12
toc: true
---

## Installation

``` bash
dotnet add package Genocs.Tracing
```

Genocs's Web API and OpenTelemetry.

Genocs Web API is fully compliant with OpenTelemetry. This means that you can use the OpenTelemetry to implement logging, tracing, and monitoring in your application.


## Configuration

The configuration is done in the `appsettings.json` file. You can enable or disable the OpenTelemetry. You can also set the application name, exclude paths, level, console, file, seq, jaeger, and metrics.

[Open Telemetry](https://opentelemetry.io/)

