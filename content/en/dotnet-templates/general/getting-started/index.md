---
title: "Getting Started 🚀"
description: "Let's get started with the .NET WebApi Boilerplate!"
lead: "Let's get started with the .NET WebApi Boilerplate!"
date: 2021-08-30T00:59:34+05:30
lastmod: 2024-02-29T19:44:05+05:30
draft: false
images: []
menu:
  dotnet-templates:
    identifier: "general-getting-started"
    name: "Getting Started 🚀"
    parent: "general"
weight: 3
toc: true
---

  <img src="https://raw.githubusercontent.com/Genocs/genocs-library-docs/main/media/genocs-dotnet-7-webapi-boilerplate-banner.png" />
  <p>

Firstly, make sure that you have already setup your development environment that runs the prerequisite tools and SDKs. Refer [Development Environment](/dotnet-templates/general/development-environment/) for details.

This guide will take you right from strating up your own .NET Web API Project using `Genocs Library .NET WebAPI Boilerplate` package / repository to testing the API using the provided Postman/ThunderClient Collection!

To get started with this Boilerplate, here are the available options.

- Install using the `Genocs CLI` tool. Use this for release versions of the Boilerplate only.
- Fork the Repository. Use this if you want to always keep your version of the Boilerplate up-to date with the latest changes.

> Make sure that your DEV enviroment is setup, [Read the Development Environment Guide](https://genocs-blog.netlify.app/dotnet-templates/general/development-environment/)

## Genocs CLI Tool

### Prerequisites

Before creating your first Genocs Library solution, you should ensure that your local machine has:

- **.NET 8** You can find the download [here](https://dotnet.microsoft.com/en-us/download/dotnet/8.0).
- **NodeJS (16+)** You can find the download [here](https://nodejs.org/en/download).

### Installation

After you have installed .NET, you will need to install the `genocs` console tool.

``` bash
dotnet tool install --global Genocs.CLI
genocs install
```

This install the Genocs CLI tools and the associated Templates globally on your machine. You are now ready to create your first Genocs project!

Do note that, at the time of writing this documentation, the latest available version is **1.0.0** which is also one of the first stable versions of the package. It is highly likely that there is already a newer version available when you are reading this.

> *To get the latest version of the package, visit [nuget.org](https://www.nuget.org/packages/Genocs.CleanArchitectureTemplate)*
>
> *Genocs.CLI is now in release state. You can find the latest version on NuGet.org*

To learn more about the Genocs CLI tool, [read here](https://github.com/Genocs/genocs-library-docs/blob/main/fsh-cli/README.md)

## Forking Repository

You would probably need to take this approach if you want to keep your source code upto date with the latest changes. To get started based on this repository, you need to get a copy locally.

- Make a fork of Genocs.CleanArchitectureTemplate's `dotnet-templates` repository in your Github account.
- Next, since you need to start your private personal project, create your new `dotnet-templates` personal project by cloning the forked repository on your personal github. This could be done as simple as running `git clone https://github.com/{yourgithubuseraccount}/dotnet-templates.git` locally on your development machine.
- Setup an upstream remote on your personal project pointing to your forked repository using command `git remote add upstream https://github.com/{yourgithubuseraccount}/dotnet-templates` and `git remote set-url --push upstream DISABLE`

Now, whenever there is a new update on Genocs CleanArchitectureTemplate's `dotnet-templates` repository, you could simply pull in the latest change on your private fork of the Genocs CleanArchitectureTemplate's `dotnet-templates` repository and later merge these changes with you personal projects.

For step by step instructions, [follow this](https://discord.com/channels/878181478972928011/892573122186838046/933513103688224838) and [this](https://gist.github.com/0xjac/85097472043b697ab57ba1b1c7530274).


### Creating Solution

> Note that this is not valid only if you have installed the Genocs cli tool.

Now that you have installed the template locally on your machine, let's see how you can start generating complete .NET WebAPI Solutions seamlessly.

Simply navigate to a new directory (wherever you want to place your new solution at), and open up Command Prompt at the opened directory.

Run the following command. Note that, in this demonstration I am naming my new solution as `Genocs.Starter`.

``` bash
genocs api new Genocs.Starter
```

{{< img src="generate-solution-via-genocs-cli.png" >}}

Once that is done, your new solution is created for you. As simple as that!

Here are the folders and files created for you.

{{< img src="folder-structure.png" >}}

### Alternatively..

> Note that this is valid only if you have installed the NuGet package of this Boilerplate.

When you installed the NuGet package, there is also an entry that has been created into your Visual Studio Template for Genocs Library's .NET WebAPI Boilerplate. If you find it easier to work with Visual Studio rather than CLI Commands to generate new solutions, you are free to do so.

Simply open up Visual Studio 2022 and Click on Create New Project.

{{< img src="vs-template.png" >}}

Important - Make sure to check the 'Place solution and project in same directory' option. Else the solution and projects will be created on different folders and there will be build errors stating that few files are not found.

{{< img src="vs-same-directory.png" >}}

Another issue I noticed with creating solutions via Visual Studio is that the Solution structure might be lost. This is a very minor bug, that maybe someone can figure out and fix in our template configuration. Microsoft doesn't seem to have very detailed guide about this.

`However, it's always recommended to create new solutions via the Console.`

## Running the Application

Next, open up command prompt on this directory and run the following.

``` bash
code .
```

This opens up the solution via Visual Code. Make sure that you have the prerequisite tools and SDKs setup.

### Setting up the Connection String

Next, let's set up some valid connection strings. Navigate to `src/Host/Configurations` and open up `database.json`. Here you would have to provide a valid connection string under the `DatabaseSettings` to either MSSQL,  MySQL or PostgreSQL instance. Below are some sample settings for each of the DB Providers.

Details on the usage of other Settings will be explained in the upcoming documentations.

`By default, Genocs WebAPI template ships with pre-configured PostgreSQL connection strings`

{{< alert text="It is also important to update the src/Host/Configurations/hangfire.json connection string / provider as well." />}}

#### PostgreSQL

``` json
"DatabaseSettings": {
    "DBProvider": "postgresql",
    "ConnectionString": "Host=localhost;Database=rootTenantDb;Username=postgres;Password=root;Include Error Detail=true"
  }
```

#### MySQL

``` json
"DatabaseSettings": {
    "DBProvider": "mysql",
    "ConnectionString": "server=localhost;uid=root;pwd=root;database=defaultRootDb;Allow User Variables=True"
  }
```
#### MSSQL

``` json
"DatabaseSettings": {
    "DBProvider": "mssql",
    "ConnectionString": "Data Source=(localdb)\\mssqllocaldb;Initial Catalog=rootTenantDb;Integrated Security=True;MultipleActiveResultSets=True"
  }
```
#### Oracle

``` json
"DatabaseSettings": {
  "DBProvider": "oracle",
  "ConnectionString": "Data Source=(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=127.0.0.1)(PORT=49154))(CONNECT_DATA =(SERVER=DEDICATED)(SERVICE_NAME=ORCLPDB1.localdomain)));User Id=fullstack;Password=password123"
}
```

That's all about settings valid connection strings.

Next, let's understand how to build & run the project!

You can definitely use the standard ways of dotnet to build and run the application using the following commands.

``` bash
 cd src/Host
 dotnet build
 dotnet run
```

`But`, for a better developer experience, I have included a Makefile within this template. You can find this file at the root `(./Makefile)`. This file contains a bunch of commands for better automation.

Note that you will always have to be at the root of the application to execute the Makefile commands.

## Build

To build the solution,

``` bash
make build
```

Once that's done, let's start up the API server.

``` bash
make start
```

{{< img src="running-api-1.png" >}}

{{< img src="running-api-2.png" >}}

As you can see from the logs, a couple of operations happen as soon as you launch the application. Let me give a brief idea on what happens when you run the application for the very first time.

- The Migrations that already come out-of-the-box with the application gets applied. Note that you do not have to manually update the database using code.
- Being a Multitenant solution, the Application is programmed to seed a default Tenant named `root`, that is basically the super-admin of the entire application and has permissions to manage tenants.
- Once Tenant record is seeded, the tenant admin , roles and permissions are also seeded. Note that the default credentials for the root tenant admin are as follows.

``` json
{
    "email":"admin@root.com",
    "password":"123Pa$$word!"
}
```

- The Connection String that you provided in the appSettings will be taken as the `root` Tenant's Connection. Note that all the tenant data will be stored on to this connection under the Tenants table.
