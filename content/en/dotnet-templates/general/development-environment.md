---
title: "Development Environment"
description: "Setting up the Development Environment for the .NET WebApi Boilerplate"
lead: "Let's get started with setting up the Development Environment for .NET WebApi Boilerplate Development!"
date: 2023-05-13T15:51:03+02:00
lastmod: 2023-05-13T15:51:03+02:00
draft: false
images: []
menu:
  dotnet-templates:
    identifier: "general-development-environment"
    name: "Development Environment"
    parent: "general"
weight: 2
toc: true
---
Genocs Library's **.NET WebApi Boilerplate** Project Development needs you to have the following applications / tools available on your machine. Please Note that this project is being built on a Windows 11 Machine using Visual Studio Code IDE.

## .NET SDK

As mentioned earlier, this project is built with the latest available .NET SDK, which is .NET 7.0.

Ensure that you have the latest version of the SDK available - [Download from Microsoft](https://dotnet.microsoft.com/download/dotnet/7.0)

{{< alert icon="💡" text="Note : At the time of compiling this documentation, the latest version available was SDK 7.0.200" />}}


## IDE

Visual Studio Code IDE is the recommended IDE to use for Genocs Library's .NET WebApi Boilerplate Project Development. If you are not already using this IDE, consider switching to it. It's definitely worth it! (_Fun Fact : I recently switched from Visual Studio 2019 Community to Visual Studio Code and it's been awesome!_)

However, you are always free to use your choice of IDEs as well.

Incase you intend to use Visual Studio Code for development, here are a bunch of helpful extensions that I use:
- EditorConfig for VS Code
- C#
- C# Extensions
- Docker
- Markdown All in One
- NuGet Gallery
- Material Icon Theme
- REST Client

{{< alert icon="💡" text="Note : All the screenshots included in these documentations are from Visual Studio Code Point of View." />}}

## Database Servers

Genocs Library's .NET WebApi Boilerplate gives you the freedom to choose between the following 4 popular Database Providers. Please note that with the current architecture of the API Project, it would rather be easy to add in support for more DB Providers with minimal change of code. But as of now, here are the 4 Supported Database Providers! By default, `PostgreSQL` is chosen as the Database Provider.

{{< alert text="Make sure that you have at least one of these servers installed, along with a Database Management tool like Azure Data Studio / PostgreSQL pgAdmin / MySQL Workbench " />}}

### PostgreSQL

Probably the best Open Source Database Server with lots of Enterprise level features.
- Download postgresql Installer - [Get from postgresql.org](https://www.postgresql.org/download/)

### MSSQL

There are high chances that you already have this installed on your machine. This is ideal for development and production for small-mid server applications.

- Check out the Community versions of this Server - [Get from Microsoft](https://www.microsoft.com/en-in/sql-server/sql-server-downloads)
- Download SQL Server Management Studio (SSMS) - [Get from Microsoft](https://docs.microsoft.com/en-us/sql/ssms/download-sql-server-management-studio-ssms?view=sql-server-ver15)
- Download Azure Data Studio to browse your MSSQL Databases - [Get from Microsoft](https://docs.microsoft.com/en-us/sql/azure-data-studio/download-azure-data-studio)

### MySQL

- Check out the Community versions of this Server - [Get from mysql](https://dev.mysql.com/downloads/mysql/)
- Download MySQL Workbench - [Get from mysql](https://dev.mysql.com/downloads/workbench/)

### Oracle

- [Download](https://www.oracle.com/in/database/technologies/oracle19c-windows-downloads.html)

## API Testing Tools

### POSTMAN

When it comes to API Testing, Postman is the recommended tool. I have made sure to include a Postman Collection within the Repository under **/postman** folder to make sure you can test out all the existing endpoints. Note that there will be a detailed guide on how to use the given Postman Collection.
- Download Postman - [Get from postman.com](https://www.postman.com/downloads/)

### Thunderclient Extension

This is another tool for testing APIs. It's lightweight when compared to Postman, and also let's you test without leaving the IDE.
If you are using Visual Code, you would love this! Search for `Thunderclient` under extensions and get it installed.

All the required files for testing the API with thunderclient and present under **/thunder-tests** folder at the root of the solution!

## Docker

Ensure that Docker Desktop is intalled on your machine.

[Get from docker.com](https://www.docker.com/products/docker-desktop/)