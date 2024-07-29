---
title : "Logging"
description: "Adds the logging and tracing capability"
lead: ""
date: 2023-05-13T15:40:19+02:00
lastmod: 2023-06-25T15:40:19+02:00
draft: false
images: []
menu:
  library:
    identifier: "logging"
    name: "Logging"
    parent: "library"
weight: 6
toc: true
---


### Overview
Adds the logging capability, by default uses Serilog for logging with optional extensions (sinks):

- Console
- File
- Seq


### Installation

``` bash
dotnet add package Genocs.Logging
```

## Dependencies

- Genocs.Core

### Usage

Extend Program.cs -> `CreateBuilder()` with `UseLogging()` that will add the required services and configure `ILogger` available in ASP.NET Core framework.

``` cs
StaticLogger.EnsureInitialized();

var builder = WebApplication.CreateBuilder(args);

builder.Host
        .UseLogging();
```

Then, simply inject `ILogger<T>` (being ASP.NET Core built-in abstraction) to write the logs.

``` cs
public class SomeService
{
    private readonly ILogger<SomeService> _logger;

    public SomeService(ILogger<SomeService> logger)
    {
        _logger = logger;
    }

    public void Foo()
    {
        _logger.LogInformation("Foo");
    }
}
```

### Options

`level` - sets the minimum level of logs that should be written. Default: `Information`.

`excludePaths` - optional endpoints that should be excluded from logging (e.g. while performing the health checks by other services).

`excludeProperties` - optional properties that should be excluded from logging (e.g. passwords, tokens, etc.).

`minimumLevelOverrides` - overrides the minimum level of logs for specific namespaces (e.g. `Microsoft` or `System`).

`console.enabled` - enables/disables console logger.

`elk.enabled` - enables/disables ELK logger

`elk.url` - URL to ELK endpoint.

`file.enabled` - enables/disables file logger.

`file.path` - path to the file logs.

`file.interval` - how often should the new file with logs be created.

`mongo.enabled` - enables/disables Mongo logger.

`seq.enabled` - enables/disables Seq logger.

`seq.url` - URL to Seq API.

`seq.apiKey` - API key (if provided) used while sending logs to Seq.

`azure.enabled` - enables/disables Azure Application Insights logger.

`azure.connectionString` - Azure Application Insights connection string

**appsettings.json**

``` json
"logger": {
  "level": "information",
  "excludePaths": ["/", "/ping", "/metrics"],
  "minimumLevelOverrides": {
    "Microsoft": "Information",
    "System": "Warning"
  },
  "excludeProperties": [
    "api_key",
    "access_key",
    "ApiKey",
    "ApiSecret",
    "ClientId",
    "ClientSecret",
    "ConnectionString",
    "Password",
    "Email",
    "Login",
    "Secret",
    "Token"
  ],
  "azure": {
      "enabled": false,
      "connectionString": "AppInsightsConnectionString"
  },
  "console": {
    "enabled": true
  },
  "elk": {
    "enabled": false,
    "basicAuthEnabled": false,
    "url": "http://localhost:9200",
    "username": "user",
    "password": "user",
    "indexFormat": "user"
  },
  "file": {
    "enabled": true,
    "path": "logs/logs.txt",
    "interval": "day"
  },
  "loki": {
    "enabled": false,
    "url": "http://localhost:3100",
    "batchPostingLimit": "logs",
    "queueLimit": 100,
    "period": "00:00:10",
    "lokiUsername": "user",
    "lokiPassword": "password"
  },    
  "mongo": {
    "enabled": false
  },  
  "seq": {
    "enabled": true,
    "url": "http://localhost:5341",
    "apiKey": "secret"
  },
  "tags": {}
}
```