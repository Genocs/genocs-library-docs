---
title: "Genocs Microservice Template along with Entity Framework Core"
description: "Adding Database Migrations for Entity Framework Core"
lead: "Adding Database Migrations for Entity Framework Core"
date: 2022-01-15T21:31:40+05:30
lastmod: 2024-11-24T00:00:00+02:00
draft: false
images: []
menu:
  templates:
    identifier: "ef-core"
    name: "Entity Framework Core"
    parent: "tutorials"
weight: 12
toc: true
---

Genocs Library's Web API is built on top of Entity Framework Core. This means that you can easily add new entities, modify existing entities and generate database migrations with ease. This tutorial will guide you through the process of adding database migrations for Entity Framework Core with Genocs Library's Web API.

## Prerequisites

Before you begin, make sure you have the following installed on your machine:

1. [.NET 9.0 SDK](https://dotnet.microsoft.com/download/dotnet/9.0)
2. [Visual Studio Code](https://code.visualstudio.com/) or [Visual Studio 2019](https://visualstudio.microsoft.com/downloads/)
3. Database Server:

    1. [MSSQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads)
    2. [MySQL Server](https://dev.mysql.com/downloads/mysql/)
    3. [Oracle Server](https://www.oracle.com/database/technologies/)
    4. [PostgreSQL Server](https://www.postgresql.org/download/)
    5. [SQLite Server](https://www.sqlite.org/download.html)     


## Create Database Migrations

### Setting up Entity Framework Core

1. Install the Entity Framework Core tools globally
   ``` bash
   dotnet tool install --global dotnet-ef
   ```

2. Add the Entity Framework Core Design package to your (Host) project
   By default the Host project is delivered with the necessary packages.
    ``` bash
    dotnet add package Microsoft.EntityFrameworkCore.Design
    ```

3. Create the initial migration
    ``` bash
    dotnet ef migrations add InitialCreate
    ```

4. Update the database
    ``` bash
    dotnet ef database update
    ```

## Adding Database Migrations

So, you have already added new entities into the Domain project, modified an existing entity or want to recreate all the pre-generated migrations? Here is how to proceed.

Note that currently, Genocs Microservice Template supports the following major DB Providers:
1. MSSQL
2. MySQL
3. Oracle
4. PostgreSQL
5. SQLite

Here you can find everything to setup the supported Database providers - [Setup Databases](https://genocs-blog.netlify.app/templates/general/development-environment/)

To maintain scalability, the database migrations of each of these DB Providers are kept in separate class library projects namely
1. Migrators/Migrators.MSSQL
2. Migrators/Migrators.MySQL
3. Migrators/Migrators.Oracle
4. Migrators/Migrators.PostgreSQL
5. Migrators/Migrators.SQLite

Out of the box, the default migrations are already generated and is made available for you. This means you wouldn't even have to run a `update-database` to get started. The Application startup already handles it for you.

As of now, Genocs Library's Microservice Template consists of the following EF Core DB Context classes:

1. **ApplicationDbContext** - This is where you would ideally reference your new entities. By default, Catalog entities are referenced here.
2. **TenantDbContext** - Related to Finbuckle's Multitenancy setup of Stores.

which are maintained as 2 different sub-folders under each of the Migrator projects named as `Application` and `Tenant` folders.

To start with generating the database migrations, open your terminal on to the Host Project.

Note that steps are almost same for all the Database providers. But make sure that you got to have the respective connection string of the Database Provider in the `database.json` and `hangfire.json` to continue.

Meaning, if you intend to `create/update` migrations for mySQL,
1. You have to ensure that you have the mySQL Server up and running on your development machine.
2. You have a valid connection string to the mySQL Server updated on both the `database.json` and `hangfire.json` configuration files. This also assumes that you have updated `"DBProvider": "mysql"` too.

Below are some sample configurations for MySQL Provider. The above is applicable to all the other DB Provider.

#### database.json

**mssql** 
``` json
{
  "DatabaseSettings": {
    "DBProvider": "mssql",
    "ConnectionString": "Data Source=(localdb)\\mssqllocaldb;Initial Catalog=Genocs.Microservice.Template;Integrated Security=True;MultipleActiveResultSets=True"
  }
}
```

**mysql**
``` json
{
  "DatabaseSettings": {
    "DBProvider": "mysql",
    "ConnectionString": "server=localhost;uid=root;pwd=root;database=defaultRootDb;Allow User Variables=True"
  }
}
```

**oracle**
``` json
{
  "DatabaseSettings": {
    "DBProvider": "oracle",
    "ConnectionString": "Data Source=localhost;User Id=system;Password=oracle;"
  }
}
```

**postgresql**
``` json
{
  "DatabaseSettings": {
    "DBProvider": "postgresql",
    "ConnectionString": "Host=localhost;Port=5432;Database=Genocs.Microservice.Template;Username=postgres;Password=postgres"
  }
}
```

**sqlite**
``` json
{
  "DatabaseSettings": {
    "DBProvider": "sqlite",
    "ConnectionString": "Data Source=app.db;"
  }
}
```

#### hangfire.json

**mssql**
``` json
{
  "Storage": {
    "StorageProvider": "mssql",
    "ConnectionString": "Data Source=(localdb)\\mssqllocaldb;Initial Catalog=Genocs.Microservice.Template;Integrated Security=True;MultipleActiveResultSets=True"
  }
}
```

**mysql**
``` json
{
  "Storage": {
    "StorageProvider": "mysql",
    "ConnectionString": "server=localhost;uid=root;pwd=root;database=defaultRootDb;Allow User Variables=True"
  }
}
```

**oracle**
``` json
{
  "Storage": {
    "StorageProvider": "oracle",
    "ConnectionString": "Data Source=localhost;User Id=system;Password=oracle;"
  }
}

```

**postgresql**
``` json
{
  "Storage": {
    "StorageProvider": "postgresql",
    "ConnectionString": "Host=localhost;Port=5432;Database=Genocs.Microservice.Template;Username=postgres;Password=postgres"
  }
}
```

**sqlite**
``` json
{
  "Storage": {
    "StorageProvider": "sqlite",
    "ConnectionString": "Data Source=app.db;"
  }
}
```

The Provider values for other supported DBs are as follows.
- MSSQL - **mssql**
- MYSQL - **mysql**
- Oracle - **oracle**
- PostgreSQL - **postgresql**
- SQLite - **sqlite**

Once your connection strings are all updated in the mentioned configuration files, open up the command terminal on the Host Project's directory and run the following commands.

As mentioned earlier, since we have 2 Db Contexts defined in our application, we will have seperate commands for each of the available context classes.

**Move to the WebAPI project directory and run the following commands.**

The generic command to add migrations over the **Application Db Context** goes like this:

``` bash
dotnet ef migrations add <CommitMessage> --project ../Migrators/Migrators.<DBProvider>/ --context ApplicationDbContext -o Migrations/Application
```

The generic command to add migrations over the **Tenant Db Context** goes like this:

``` bash
dotnet ef migrations add <CommitMessage> --project ../Migrators/Migrators.<DBProvider>/ --context TenantDbContext -o Migrations/Tenant
```

where
- `<CommitMessage>` should be replaced by an appropriate name that describes the Migration
- `<DBProvider>` should be replaced by your selected Database Provider (`MSSQL`, `MySQL`, `Oracle`, `PostgreSQL`, `SqLite`)

Keeping that in mind, here is how you would add Migrations for MySQL.

1. Ensure that you have updated the connection string and dbProvider properties of both `hangfire.json` and `database.json` configuration files.
2. Open up the command terminal on the Host Project's directory.
3. To add migrations related to ApplicationDbContext, run

``` bash
dotnet ef migrations add AddedMenuEntity --project ../Migrators/Migrators.MySQL/ --context ApplicationDbContext -o Migrations/Application
```

4. To add migrations related to TenantDbContext, run

``` bash
dotnet ef migrations add ModifiedTenantTable --project ../Migrators/Migrators.MySQL/ --context TenantDbContext -o Migrations/Tenant
```

That's almost it.

Once the process is completed you would be able see new Migration cs files that represent your new `additions/modifications` at the table level added to the respective Migrator project.

You do not have to do anything extra to apply the migrations to your database. The application does it for you during the startup.
