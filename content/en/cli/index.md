---
title: "CLI"
description: "The genocs CLI (Command Line Interface) tool is a powerful and versatile command-line utility that enables developers to efficiently build, test, and run  applications. It provides a unified experience across different platforms, allowing developers to create cross-platform applications with ease. With its extensive set of commands, the .NET CLI tool simplifies the development process by automating tasks such as project management, dependency resolution, and deployment. It is an essential tool for modern developers, offering productivity, flexibility, and scalability in application development."
date: 2023-05-13T15:40:19+02:00
lastmod: 2024-02-29T19:44:19+02:00
draft: false
images: []
---


## Introduction

The **Genocs CLI** (Command Line Interface) tool is a powerful and versatile command-line utility that enables developers to efficiently build, test, and run applications. It provides a unified experience across different services inside your platform. It allow developers to create applications with ease. With its extensive set of commands, the genocs CLI tool simplifies the development process by automating tasks such as project management, dependency resolution, and deployment. It is an essential tool for modern  developers, offering productivity, and scalability in application development.

**Genocs CLI** is the *dotnet tool* that allow you to use the genocs templates.
Genocs templates are dotnet template that will help you to setup quickly and easily services in your environment.

Genocs tool is based on Microsoft - dotnet tools. Here where you can find the official Documentation:

- [Microsoft - dotnet tools](https://learn.microsoft.com/en-us/dotnet/core/tools/global-tools)

## Supported runtime

Genocs CLI can be used on both .NET 8.

---

{{< img src="initialize.png" >}}

## How to install

To install the tool the only think you have to do is to take it from NuGet, install it into your global, that's it.

``` bash
dotnet tool install -g genocs.cli
```

### Useful commands

``` bash
# Get the list of tool
dotnet tool list

# Get the list of templates
# Remember templates are the actual component that allows you to scaffold the service solution.
dotnet new list

# Install from nuget
dotnet tool install -g genocs.cli

# Update the tool
dotnet tool update -g genocs.cli

# Uninstall cache
dotnet tool uninstall -g genocs.cli
```

## Install templates

Genocs contains a bunch of templates that you can use to build a complete set of services from scratch.

The picture shows the console log upon the template are installed.

{{< img src="template_installed.png" >}}

## The Templates

| Template        |      Command      |  To be used for                                 |
|:----------------|:------------------|------------------------------------------------:|
| angular         | gnx-angular       | angular front-end SPA                           |
| react           | gnx-react         | react front-end SPA                             |
| blazor          | gnx-wasmblazor    | web assembly - blazor portal                    |
| cleanblazor     | gnx-cleanblazor   | clean architecture - blazor portal              |
| webapi          | gnx-cleanwebapi   | onion clean architecture - WebAPI               |
| webapi          | gnx-microwebapi   | microservice multitenant - WebAPI               |
| webapi          | gnx-librawebapi   | microservice on top of Genocs Library - WebAPI  |

## Uninstall templates

To uninstall the templates you can use the following command:

``` bash
# Get the templates list
dotnet new uninstall

# Follow the command line instruction
# or run the commands below
dotnet new uninstall Genocs.CleanArchitectureTemplate
dotnet new uninstall Genocs.WebApiTemplate
dotnet new uninstall Genocs.MicroserviceTemplate
dotnet new uninstall Genocs.Microservice.Template
```

### blazor

To create a blazor portal use one of these commands

``` bash
# To build a blazor portal 
genocs blazor new <Company.Project.Service>

# (SOON) To build a clean architecture blazor portal 
genocs cleanblazor new <Company.Project.Service>
```

### WebAPI

``` bash
# To build a web api architecture webapi 
genocs webapi new <Company.Project.Service>

# Another option to build a clen architecture webapi 
genocs cleanapi new <Company.Project.Service>

# To build a microservice webapi with multitentant support
genocs microservice  <Company.Project.Service>
```

## The solution

You can find the solution on GitHub:

[genocs-library-cli](https://github.com/Genocs/genocs-library-cli)

You are free to fork or to clone it. Then you can update it at your own pace.

### Useful commands to work on your own

``` bash
# build the project 
dotnet build ./src/genocs.cli.csproj

# Pack the tool (to be deployed on nuget) 
dotnet pack

# Run the tool to install the templates using the net8 as runtime
dotnet run -f net8.0 --project ./src/genocs.cli.csproj genocs -i

# Run the tool to install the templates (some as above with cd command)
cd ./src
dotnet run -f net8.0 genocs -i

# Install the tool from local folder to the global cache
dotnet tool install --global --add-source ./src/nupkg genocs.cli
```
