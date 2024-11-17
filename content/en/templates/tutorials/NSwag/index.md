---
title: "How to use NSwag with Genocs Microservice Template"
description: "Using NSwag with Genocs Microservice Template"
lead: "Let's get started with using NSwag with Genocs Microservice Template"
date: 2024-10-07T16:14:00+02:00
lastmod: 2024-10-07T16:14:00+02:00
draft: false
images: []
menu:
  templates:
    identifier: "nswag"
    name: "NSwag"
    parent: "tutorials"
weight: 12
toc: true
---

Genocs Library's Blazor Template leverege the NSwag capabilities. This means that you can easily generate API Clients ease. This tutorial will guide you through the process of using NSwag with Genocs Library's Web API.


## Prerequisites

The template contains a script that will automatically generate the necessary files for you. However, you need to have the following components installed on your machine:

```ps
# Install the NSwag Build *Mandatory*
dotnet tool install -g NSwag.MSBuild

# Install the NSwag CLI *Optional*
dotnet tool install -g NSwag.Console

# Install the NSwag Code Generation *Optional*
dotnet tool install -g NSwag.CodeGeneration
```
           

Into the `scripts` folder you will find `nswag-regen.ps1`. This script will generate the necessary files for you. You can run the script by executing the following command:

Before run be sure the API is running, you can run the API by executing the following command:

```ps
# Run your API locally
dotnet run --project .\src\Genocs.MicroserviceTemplate.Api\Genocs.MicroserviceTemplate.Api.csproj
```

then run the script:
```ps
.\scripts\nswag-regen.ps1
```

The script will generate the necessary `src\Infrastructure\ApiClient\GNXApi.cs` file for you..