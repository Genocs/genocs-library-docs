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

``` cs
Log.Logger = new LoggerConfiguration()
    .MinimumLevel.Debug()
    .MinimumLevel.Override("Microsoft", LogEventLevel.Information)
    .MinimumLevel.Override("MassTransit", LogEventLevel.Information)
    .Enrich.FromLogContext()
    .WriteTo.Console()
    .CreateLogger();

var builder = WebApplication.CreateBuilder(args);

builder.Host
        .UseLogging();

// add services to DI container
var services = builder.Services;

services
    .AddGenocs(builder.Configuration);

```

Add the required services to the DI container.

``` cs
services.AddCors();
services.AddControllers().AddJsonOptions(x =>
{
    // serialize enums as strings in api responses (e.g. Role)
    x.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
});

services.AddHealthChecks();

services.Configure<HealthCheckPublisherOptions>(options =>
{
    options.Delay = TimeSpan.FromSeconds(2);
    options.Predicate = check => check.Tags.Contains("ready");
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
services.AddEndpointsApiExplorer();
services.AddSwaggerGen();

services.AddOptions();
```

Then, build, setup use components and run the Application.

``` cs
var app = builder.Build();

// Enable middleware to serve generated Swagger as a JSON endpoint.
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

app.MapHealthChecks("/hc");

app.Run();
```

Close the log as the last action.

``` c#

// Close the log and flush all the events in the buffer.
Log.CloseAndFlush();
```

## Options

`name` - the service name.

`service` - service name used TBW.

`instance` - the service instance.

`version` - service version.

`displayBanner` - if true then the banner is shown into the console.

`displayVersion` - if true then the service version is shown into the console. See `version` param.

## Settings

**appsettings.json**

``` json
  "app": {
    "name": "Service Name",
    "service": "name-servcice",
    "instance": "000001",
    "version": "v1.0",
    "displayBanner": true,
    "displayVersion": true
  },
```
