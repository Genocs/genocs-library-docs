---
title: "cli"
description: "The genocs CLI (Command Line Interface) tool is a powerful and versatile command-line utility that enables developers to efficiently build, test, and run .NET applications. It provides a unified experience across different platforms, allowing developers to create cross-platform applications with ease. With its extensive set of commands, the .NET CLI tool simplifies the development process by automating tasks such as project management, dependency resolution, and deployment. It is an essential tool for modern .NET developers, offering productivity, flexibility, and scalability in application development."
date: 2023-05-13T15:40:19+02:00
lastmod: 2023-05-13T15:40:19+02:00
draft: false
images: []
---


## Introduction

The genocs CLI (Command Line Interface) tool is a powerful and versatile command-line utility that enables developers to efficiently build, test, and run .NET applications. It provides a unified experience across different platforms, allowing developers to create cross-platform applications with ease. With its extensive set of commands, the .NET CLI tool simplifies the development process by automating tasks such as project management, dependency resolution, and deployment. It is an essential tool for modern .NET developers, offering productivity, flexibility, and scalability in application development.


Genocs cli is the genocs **dotnet tool**  that allow you to use the genocs templates.
Genocs template are dotnet template that will help you to setup quickly and easily your environment.

Here where you can find the official Documentation:
- [microsoft - dotnet tools](https://learn.microsoft.com/en-us/dotnet/core/tools/global-tools)


## Supported runtime

Genocs cli can be used on NET6 or NET7.

---

{{< img src="initialize.png" >}}


### Usefull commands

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



# The solution

You can find the solution on github:

[genocs-library-cli](https://github.com/Genocs/genocs-library-cli)

You are free to clone, update at you own disposal.




### Usefull commands to work on your own 
``` bash
# build the project 
dotnet build ./src/genocs.cli.csproj

# Pack the tool (to be deployed on nuget) 
dotnet pack

# Run the tool to install the templates
dotnet run -f net7.0 --project ./src/genocs.cli.csproj genocs -i

# Run the tool to install the templates (some as above with cd command)
cd ./src
dotnet run -f net7.0 genocs -i

# Install the tool from local folder to the global cache
dotnet tool install --global --add-source ./src/nupkg genocs.cli
```