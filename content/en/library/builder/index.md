---
title : "Builder"
description: "Genocs builder is the entrypoint for the application builder."
lead: ""
date: 2023-12-20T17:40:19+02:00
lastmod: 2023-12-20T17:40:19+02:00
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

Extend `IServiceCollection` with `AddGenocs(builder.Configuration)` that will get register the required services.

This is what you need to do in the `Program.cs` file.

``` c#
// Create a new WebApplication
var builder = WebApplication.CreateBuilder(args);

// Get the services
var services = builder.Services;

// Setup the builder
services.AddGenocs(builder.Configuration);
```


## Example

This is an example of how to setup the builder in the `Program.cs` file along with some other services.

``` c#
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

// Get the services
var services = builder.Services;

// Setup the builder
services
    .AddGenocs(builder.Configuration) // Setup Genocs builder
    .AddOpenTelemetry() // Add OpenTelemetry
    .AddMongoFast() // Add MongoDb
    .RegisterMongoRepositories(Assembly.GetExecutingAssembly()) // Register MongoDb Repositories
    .AddApplicationServices() // Add Application Services
    .Build(); // Build the services

services.AddCors(); // Add Cors
services.AddControllers().AddJsonOptions(x =>
{
    // serialize Enums as strings in api responses (e.g. Role)
    x.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
});

// Add health checks
services.AddHealthChecks();


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

// Map the health checks
app.MapHealthChecks("/hc");

// Run the application
app.Run();

// Close the log and flush all the events in the buffer.
Log.CloseAndFlush();
```

## Console

{{< img src="service_console.png" >}}


## Options

`name` - The service name.

`service` - Service name used TBW.

`instance` - The service instance.

`version` - The service version.

`displayBanner` - If true then the banner is shown into the console.

`displayVersion` - If true then the service version is shown into the console. See `version` param.

## Settings

**appsettings.json**

Use the following settings in the `appsettings.json` file according to your needs.

``` json
  "app": {
    "name": "Service Name",
    "service": "service-name",
    "instance": "000001",
    "version": "v1.0",
    "displayBanner": true,
    "displayVersion": true
  },
```
