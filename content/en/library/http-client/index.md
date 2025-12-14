---
title : "Http Clients"
description: "Requests, service discovery, load balancing."
lead: ""
date: 2023-05-13T15:40:19+02:00
lastmod: 2023-07-09T22:29:19+02:00
draft: false
images: []
menu:
  library:
    identifier: "http-client"
    name: "HTTP Clients"
    parent: "library"
weight: 5
toc: true
---


### Overview

Enhances the built-in `HttpClient` with an `IHttpClient` interface with retry policy using Polly and adds a possibility to easily use **Consul** service discovery and **Fabio** load balancing mechanisms, as well as switching between the different implementations.

## Installation

```bash
dotnet add package Genocs.HTTP
```

## Dependencies

- Genocs.Core


### Usage

1. Extend `IGenocsBuilder` with `AddHttpClient()` that will register the required services.

  ``` cs
  // Create a new WebApplication
  var builder = WebApplication.CreateBuilder(args);

  builder.AddGenocs()
          .AddHttpClient()
          .Build();

  ... // Add other services
  // Other services.
  ```

Then, simply inject `IHttpClient` (and optionally HttpClientOptions to resolve services URLS) to execute HTTP requests.

``` cs
public class SomeService
{
    private readonly string _webServiceUrl;
    private readonly IHttpClient _client;

    public SomeService(IHttpClient _client, HttpClientOptions options)
    {
        _client = _client;
        _webServiceUrl = options.Services["web-service1"];
    }

    public async Task FooAsync()
    {
        var dto = await _client.GetAsync<Dto>($"{_webService1Url}/data");
    }
}
```

### Options

`type` - It sets the IHttpClient message handler, if none is specified then the default handler will be used, other possible values: consul, fabio.

`retries` - The number of HTTP request retries using an exponential backoff.

`services` - The dictionary (map) of service_name:service_url values that can be used to invoke the other web services without a need to hardcode the configuration URLs, especially useful when service discovery mechanism or load balancer is available.

**appsettings.json**

```json
"httpClient": {
  "type": "",
  "retries": 2,
  "services": {
    "web-service1": "http://localhost:5050",
    "web-service2": "web-service2-from-dns"
  }
}
```
---

## Service Discovery

### Overview

Provides ConsulServiceDiscoveryMessageHandler (used by IHttpClient) that integrates with Consul service discovery mechanism.

### Installation

```bash
dotnet add package Genocs.Discovery
```

### Dependencies

- Genocs.Core
- Genocs.HTTP

### Usage

1. Extend IGenocsBuilder with `AddConsul()` that will register the required services.

    ``` cs
    // Create a new WebApplication
    var builder = WebApplication.CreateBuilder(args);

    builder.AddGenocs()
            .AddHttpClient()
            .AddConsul()
            .Build();

    ```

### Options

`enabled` - It determines whether Consul integration is going to be available.

`url` - The URL of the Consul service.

`service` - The name of the service group (multiple instances of the same service will use the same service name).

`address` - The address of the service.

`port` - The port under which the service is available.

`pingEnabled` - Register health checks from Consul to validate the service availability (if the service will be offline, it will be removed after the pingInterval and removeAfterInterval timeouts).

`pingEndpoint` - The endpoint that is called when performing the health check by Consul.

**appsettings.json**

```json
"consul": {
  "enabled": true,
  "url": "http://localhost:8500",
  "service": "some-service",
  "address": "localhost",
  "port": "5000",
  "pingEnabled": true,
  "pingEndpoint": "ping",
  "pingInterval": 3,
  "removeAfterInterval": 3
}
```

---

## Load Balancing

### Overview

Provides FabioMessageHandler (used by `IHttpClient`) that integrates with Fabio load balancer. In order to use **Fabio**, it is required to configure **Consul** as described above.

### Installation

```bash
dotnet add package Genocs.LoadBalancing
```

### Dependencies

- Genocs.Core
- Genocs.HTTP
- Genocs.Discovery

### Usage
1. Extend `IGenocsBuilder` with `AddFabio()` that will register the required services.

    ``` cs
    // Create a new WebApplication
    var builder = WebApplication.CreateBuilder(args);

    builder.AddGenocs()
            .AddHttpClient()
            .AddConsul()
            .AddFabio()
            .Build();
    ```

### Options

`enabled` - It determines whether Fabio integration is going to be available.

`url` - The URL of the Fabio service.

`service` - the name of the service group used for the Consul registration.

**appsettings.json**

```json
"fabio": {
  "enabled": true,
  "url": "http://localhost:9999",
  "service": "some-service"
}
```