---
title : "Builder"
description: "Genocs builder is the entrypoint for the application builder."
lead: ""
date: 2023-12-20T17:40:19+02:00
lastmod: 2024-11-30T00:00:00+02:00
draft: false
images: []
menu:
  library:
    identifier: "builder"
    name: "Builder"
    parent: "library"
weight: 1
toc: true
---

## Installation

``` bash
dotnet add package Genocs.Core
```

## Dependencies

- Genocs.Common

## Usage

The builder is the entrypoint for the application builder. You can use the `Genocs.Core` builder to setup the application.

There are two ways to setup the builder:

1. Extend `WebApplicationBuilder` with `UseGenocs()`

    This is what you need to do in the `Program.cs` file.

    ```csharp
    // Create a new WebApplication
    var builder = WebApplication.CreateBuilder(args);

    builder.AddGenocs();

    ... // Add other services
    ```

    This option will allow you to be able to integrate [Microsoft Aspire](https://learn.microsoft.com/en-us/dotnet/aspire/) effortlessly, as well as, you can add the following services:

    ```csharp
    ... // From the above code
    builder.AddJwt()
            .AddOpenTelemetry()
            .AddMongoFast()
            .RegisterMongoRepositories(Assembly.GetExecutingAssembly())
            .AddApplicationServices()
            .Build();
    ```

2. Extend `IServiceCollection` with `AddGenocs(builder.Configuration)` that will get register the required services.

    This is what you need to do in the `Program.cs` file.

    ```csharp
    // Create a new WebApplication
    var builder = WebApplication.CreateBuilder(args);

    // Get the services
    var services = builder.Services;

    // Setup the builder
    services.AddGenocs(builder.Configuration);
    ```


> NOTE: By Adding `AddGenocs(builder.Configuration)` you are adding the following services:

// Add health checks
services.AddHealthChecks();

No need to call MapHealthChecks, it is already done for you.

```csharp
// Map the Default Endpoints
// It contains the following endpoints:
// - /
// - /healthz
// - /live
app.MapDefaultEndpoints();
```



## Example

This is an example of how to setup the builder in the `Program.cs` file along with some other services.

```csharp
using Genocs.Core.Builders;
using Genocs.Core.Demo.WebApi.Infrastructure.Extensions;
using Genocs.Core.Demo.WebApi.Options;
using Genocs.Logging;
using Genocs.Persistence.MongoDb.Extensions;
using Genocs.Secrets.AzureKeyVault;
using Genocs.Tracing;
using Microsoft.Extensions.Diagnostics.HealthChecks;
using Serilog;
using Serilog.Events;
using System.Reflection;
using System.Text.Json.Serialization;

// Setup the logger
StaticLogger.EnsureInitialized();

// Create a new WebApplication
var builder = WebApplication.CreateBuilder(args);

builder.Host
        .UseAzureKeyVault() // Use Azure Key Vault
        .UseLogging(); // Use Serilog


// Setup the builder
builder
    .AddGenocs() // Setup Genocs builder
    .AddOpenTelemetry() // Add OpenTelemetry
    .AddMongoFast() // Add MongoDb
    .RegisterMongoRepositories(Assembly.GetExecutingAssembly()) // Register MongoDb Repositories
    .AddApplicationServices() // Add Application Services
    .Build(); // Build the services

// Get the services
var services = builder.Services;

services.AddCors(); // Add Cors
services.AddControllers().AddJsonOptions(x =>
{
    // serialize Enums as strings in api responses (e.g. Role)
    x.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
});

var settings = new SecretSettings();
builder.Configuration.GetSection(SecretSettings.Position).Bind(settings);
services.AddSingleton(settings);

services.Configure<HealthCheckPublisherOptions>(options =>
{
    options.Delay = TimeSpan.FromSeconds(2);
    options.Predicate = check => check.Tags.Contains("ready");
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
services.AddEndpointsApiExplorer();
services.AddSwaggerGen();

// Add the options
services.AddOptions();

// Build the application
var app = builder.Build();

// Configure the api documentation (Swagger and SwaggerUI only in Development environment)
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// global cors policy
app.UseCors(x => x
    .SetIsOriginAllowed(origin => true)
    .AllowAnyMethod()
    .AllowAnyHeader()
    .AllowCredentials());


app.UseHttpsRedirection();

app.UseRouting();

app.UseAuthorization();

app.MapControllers();

// Map the Default Endpoints and Health Checks
app.MapDefaultEndpoints();

// Run the application
app.Run();

// Close the log and flush all the events in the buffer.
Log.CloseAndFlush();
```

## Console

{{< img src="service_console.png" >}}


## Options

- `name` - The service name. The service name is used to display the banner and the version is used to display the version of the service.
- `service` - Service property is used to identify the service. This is used to identify the service in the logs. It *mandatory* to have this property when using the **OpenTelemetry** support.  
- `instance` - The service instance. If present then the instance is used to setup **OpenTelemetry**.
- `version` - The service version. If present then the version is used to setup **OpenTelemetry**.
- `displayBanner` - If true then the banner is shown into the console.
- `displayVersion` - If true then the service version is shown into the console. See `version` param.


The service name is used to display the banner and the version is used to display the version of the service.

```csharp

## Settings

Use the following settings in the `appsettings.json` file according to your needs.

```json
  "app": {
    "name": "Service Name",
    "service": "service-name",
    "instance": "01",
    "version": "v1.0",
    "displayBanner": true,
    "displayVersion": true
  }
```
