---
title : "Distributed Tracing"
description: "Genocs Library make use of Distributed tracing to implement cross service tracing!"
lead: ""
date: 2023-05-13T15:40:19+02:00
lastmod: 2024-11-16T00:00:00+02:00
draft: false
images: []
menu:
  library:
    identifier: "distributed-tracing"
    name: "Distributed Tracing"
    parent: "library"
weight: 4
toc: true
---


## Installation

```bash
dotnet add package Genocs.Tracing
```

> **Open Tracing Migration to Open Telemetry**
>
> We have removed Open Tracing reference. The library is complaint with [Open Telemetry](https://opentelemetry.io/)
> Library. We are in the process of upgrading naming convention of our library to Open Telemetry. Please stay tuned for the updates.
>

## Dependencies

- Genocs.Core
- Open Tracing

Genocs Library does not generate any default spans for your ASP.NET Core applications. However, this can be simply achieved by plugging in Open Tracing.

## Installation


## Usage

Inside your *Program.cs* extend `IGenocsBuilder` with `AddOpenTelemetry()` then `AddJaeger()` that will create the `ITracer` using chosen sampler and reporter:

``` cs

var builder = services
                    .AddGenocs()
                    .AddOpenTelemetry();

// No need to register ITracer as it is already registered by AddJaeger() method
//                    .AddJaeger();


//other registrations    
return builder.Build();
```

### Jaeger

Once your application produces spans needed for Jaeger, you need to enable reporting in a way that suits you the most.

### Creating custom spans

> **Note:** 
> Obsolete: This method is obsolete and will be removed in future versions. Please use the new method to create custom spans.

> Once the `ITracer` got registered in Startup.cs file, you can inject it to any class you want to create custom spans (not provided by Open > Tracing) as follows:
> 
> ``` cs
> public class MyClass
> {
>     private readonly ITracer _tracer;
> 
>     public MyClass(ITracer tracer)
>     {
>         _tracer = tracer;
>     }
> 
>     public void MyMethod()
>     {
>         using(var scope = BuildScope())
>         {
>             var span = scope.Span;
> 
>             try
>             {
>                 span.Log("Starting the execution of the code");
>                 ///some code
>             }
>             catch(Exception ex)
>             {
>                 span.Log(ex.Message);
>                 span.SetTag(Tags.Error, true);
>             }
>         }
>     }
> 
>     private IScope BuildScope()
>         => _tracer
>             .BuildSpan("Executing important code")
>             .StartActive(true);
> }
```

## Options

`enabled` - It determines whether reporting is enabled.

`serviceName` - The name of the application that’s going to be used in Jaeger query engine.

`endpoint` - The host part of the Jaeger endpoint.

`protocol` - The protocol used to communicate with Jaeger engine. Default is `Grpc`. The allowed values are: `and` or `HttpProtobuf`.

`processorType` - The type of the processor used to send spans to Jaeger. Default is `Batch`. The allowed values are: `Batch` and `Simple`.

`maxQueueSize` - The maximum number of spans that can be stored in the queue before they are sent to Jaeger. Default is `2048`.

`scheduledDelayMilliseconds` - The time in milliseconds between each attempt to send spans to Jaeger. Default is `5000`.

`exporterTimeoutMilliseconds` - The time in milliseconds after which the exporter will stop trying to send spans to Jaeger. Default is `30000`.

`maxExportBatchSize` - The maximum number of spans that can be sent to Jaeger in a single batch. Default is `512`.

## Settings

Following settings are required to be set in your **appsettings.json**

```json
"jaeger": {
    "enabled": true,
    "serviceName": "orders",
    "endpoint": "http://localhost:4317",
    "protocol": "Grpc",
    "processorType": "Batch",
    "maxQueueSize": 2048,
    "scheduledDelayMilliseconds": 5000,
    "exporterTimeoutMilliseconds": 30000,
    "maxExportBatchSize": 512
}
```

