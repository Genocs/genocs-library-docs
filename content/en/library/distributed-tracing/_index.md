---
title : "Library"
description: "Genocs Library make use of Distributed tracing to implement cross service tracing!"
lead: ""
date: 2023-05-13T15:40:19+02:00
lastmod: 2023-05-13T15:40:19+02:00
draft: false
images: []
menu:
  library:
    identifier: "distributed-tracing"
    name: "Distributed Tracing"
    parent: "library"
weight: 1
toc: true
---


## Installation

``` bash
dotnet add package Genocs.Tracing
```


## Dependencies

- Genocs.Core
- Open Tracing

Genocs Library does not generate any default spans for your ASP.NET Core applications. However, this can be simply achieved by plugging in Open Tracing:

## Installation

``` bash
dotnet add package OpenTracing
```

## Usage

Enable the instrumentation inside your Startup.cs -> ConfigureServices() by calling AddOpenTracing() method on IServiceCollection:

``` cs
public void ConfigureServices(this IServiceCollection services)
{
    services.AddOpenTracing();
}
```

### Jaeger

Once your application produces spans needed for Jaeger, you need to enable reporting in a way that suits you the most.

## Options

`enabled` - determines whether reporting is enabled.

`serviceName` - name of the applciation that’s going to be used in Jaeger query engine.

`udpHost` - host part of the Jaeger endpoint (UDP).

`udpPort` - port of the Jaeger endpoint (UDP).

`maxPacketSize` - maximum size of the UDP header packet (by default 0). This is not required.

`sampler` - The allowed values are: const, rate and probabilistic. For more details about sampling check the official Jaeger Docs.

`maxTracesPerSecond` - determines maximum number of reported traces per second. Required only for rate sampler.

`samplingRate` - determines the percentage of spans to report. Required only for probabilistic sampler.

**appsettings.json**

``` json
"jaeger": {
  "enabled": true,
  "serviceName": "users",
  "udpHost": "localhost",
  "udpPort": 6831,
  "maxPacketSize": 65000,
  "sampler": "const",
  "maxTracesPerSecond": 10,
  "excludePaths": ["/", "/ping", "/metrics"]
}
```

## Usage
Inside your Startup.cs extend `IGenocsBuilder` with `AddJaeger()` that will create the `ITracer` using chosen sampler and reporter:

``` cs
public IServiceProvider ConfigureServices(this IServiceCollection services)
{
    services.AddOpenTracing();

    var builder = services
                        .AddGenocs()
                        .AddJaeger();

    //other registrations    
    return builder.Build();
}
```

### Creating custom spans

Once the ITracer got registered in Startup.cs file, you can inject it to any class you want to create custom spans (not provided by Open Tracing) as follows:

``` cs
public class MyClass
{
    private readonly ITracer _tracer;

    public MyClass(ITracer tracer)
    {
        _tracer = tracer;
    }

    public void MyMethod()
    {
        using(var scope = BuildScope())
        {
            var span = scope.Span;

            try
            {
                span.Log("Starting the execution of the code");
                ///some code
            }
            catch(Exception ex)
            {
                span.Log(ex.Message);
                span.SetTag(Tags.Error, true);
            }
        }
    }

    private IScope BuildScope()
        => _tracer
            .BuildSpan("Executing important code")
            .StartActive(true);
}
```