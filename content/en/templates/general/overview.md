---
title: "Overview"
description: "Genocs Library built with .NET 9.0. Incorporates the most essential Packages your projects will ever need. Follows Clean Architecture Principles."
lead: "Genocs Library built with .NET 9.0. Incorporates the most essential Packages your projects will ever need. Follows Clean Architecture Principles."
date: 2023-05-13 09:17:27+02:00
lastmod: 2024-11-24T00:00:00+02:00
draft: false
images: []
menu:
  templates:
    identifier: "general-overview"
    name: "Overview"
    parent: "general"
weight: 1
toc: true
---

Genocs Library is a starting point for your next `.NET Microservices library` that incorporates the most essential packages and features your projects will ever need including out of the box Multi-Tenancy support.

> As the name suggests, this is an API / Server Template. You can find other Client Templates that consume this API under `@genocs-library` handle.
> - Find `Blazor WebAssembly Template` here - https://github.com/Genocs/genocs-library-blazor-template

## Goals

The goal of this repository is to provide a complete and feature-rich starting point for any .NET Developer / Team to kick-start their next major project using .NET 9.0 microservice cloud agnostic solution. This also serves the purpose of learning advanced concepts and implementations such as `Multitenancy, CQRS, Onion Architecture, Clean Coding standards, Cloud Deployments with Terraform to AWS, Docker Concepts, CICD Pipelines & Workflows` and so on.

## Features

- [x] Built on .NET 9.0
- [x] Follows Clean Architecture Principles
- [x] Domain Driven Design
- [x] Cloud Ready. Can be deployed to AWS Infrastructure as ECS Containers using Terraform!
- [x] Docker-Compose File Examples
- [x] Documented at [Genocs Blog](https://genocs-blog.netlify.app)
- [x] Multi Tenancy Support with Finbuckle
  - [x] Create Tenants with Multi Database / Shared Database Support
  - [x] Activate / Deactivate Tenants on Demand
  - [x] Upgrade Subscription of Tenants - Add More Validity Months to each tenant!
- [x] Supports MSSQL, MySQL, Oracle,PostgreSQL, SqLite!

<details>
  <summary>Click to See More!</summary>

- [x] Uses Entity Framework Core as DB Abstraction
- [x] Flexible Repository Pattern
- [x] Dapper Integration for Optimal Performance
- [x] Serilog Integration with various Sinks - File, SEQ, Kibana
- [x] OpenAPI - Supports Client Service Generation
- [x] Mapster Integration for Quicker Mapping
- [x] API Versioning
- [x] Response Caching - Distributed Caching + REDIS
- [x] Fluent Validations
- [x] Audit Logging
- [x] Advanced User & Role Based Permission Management
- [x] Code Analysis & StyleCop Integration with Rulesets
- [x] JSON Based Localization with Caching
- [x] Hangfire Support - Secured Dashboard
- [x] File Storage Service
- [x] Test Projects
- [x] JWT & Azure AD Authentication
- [x] MediatR - CQRS
- [x] SignalR Notifications
- [x] & Much More

</details>

## Documentation

Read Documentation related to this Template here - https://genocs-blog.netlify.app/templates/
> Feel free to contribute to the Documentation Repository - https://github.com/Genocs/genocs-library-docs

## Getting Started

To get started with this Template, here are the available options.

- Install using the `Genocs CLI` tool. Use this for release versions of the Template only.
- Fork the Repository. Use this if you want to always keep your version of the Template up-to date with the latest changes.

> Make sure that your DEV enviroment is setup, [Read the Development Environment Guide](https://genocs-blog.netlify.app/templates/general/development-environment/)

### Genocs CLI Tool

#### Prerequisites

Before creating your first solution, you should ensure that your local machine has:

- **.NET 9.0** You can find the download [here](https://dotnet.microsoft.com/en-us/download/dotnet/9.0).
- **NodeJS (16+)** You can find the download [here](https://nodejs.org/en/download).

#### Installation

After you have installed .NET, you will need to install the `Genocs CLI` console tool.

``` bash
dotnet tool install --global Genocs.CLI
genocs install
```

This install the `Genocs CLI` tools and the associated Templates. You are now ready to create your first project!

#### Genocs .NET WebAPI Template
Here's how you would create a Solution using the Genocs .NET WebAPI Template.

Simply navigate to a new directory (wherever you want to place your new solution), and open up Command Prompt at the opened directory.

Run the following command. Note that, in this demonstration, I am naming my new solution as Genocs.Starter.

``` bash
genocs api new Genocs.Starter
```

OR

``` bash
genocs api n Genocs.Starter
```

This will create a new .NET 9.0 WebAPI solution for you using the Genocs Templates.
For further steps and details, [Read the Getting Started Guide](https://genocs-blog.netlify.app/templates/general/getting-started/)

#### Update
To update the tool & templates, run the following commands

``` bash
dotnet tool update Genocs.CLI --global
genocs update
```

### Forking the Repository

You would probably need to take this approach if you want to keep your source code up to date with the latest changes. To get started based on this repository, you need to get a copy locally. You have three options: fork, clone, or download.

- Make a fork of this repository in your Github account.
- Create your new `dotnet-templates` personal project by cloning the forked repository on your personal github.
- Setup an upstream remote on your personal project pointing to your forked repository using command `git remote add upstream https://github.com/{githubuseraccount}/dotnet-templates` and `git remote set-url --push upstream DISABLE`

For step by step instructions, [follow this](https://discord.com/channels/878181478972928011/892573122186838046/933513103688224838) and [this](https://gist.github.com/0xjac/85097472043b697ab57ba1b1c7530274).

## Quick Start Guide

So, for a better developer experience, I have added Makefile into the solution. Now that our solution is generated, let's navigate to the root folder of the solution and open up a command terminal.

To build the solution

``` bash
make build
```

By default, the solution is configured to work with postgresql database (mainly because of hte OS licensing). So, you will have to make sure that postgresql database instance is up and running on your machine. You can modify the connection string to include your username and password. Connections strings can be found at `src/Host/Configurations/database.json` and `src/Host/Configurations/hangfire.json`. Once that's done, let's start up the API server.

``` bash
make start
```

That's it, the application would connect to the defined postgresql database and start creating tables, and seed required data.

For testing this API, we have 3 options.

1. Swagger @ `localhost:5001/swagger`
2. Postman collections are available `./postman`
3. ThunderClient for VSCode. You will have to install the Thunderclient extension for VSCode.

The default credentials to this API is:

``` json
{
    "email":"admin@root.com",
    "password":"123Pa$$word!"
}
```

Open up Postman, Thunderclient or Swagger.

identity -> get-token

This is a POST Request. Here the body of the request will be the JSON (credentials) I specified earlier. And also, remember to pass the tenant id in the header of the request. The default tenant id is `root`.

Here is a sample CURL command for getting the tokens.

``` curl
curl -X POST \
  'https://localhost:5001/api/tokens' \
  --header 'Accept: */*' \
  --header 'tenant: root' \
  --header 'Accept-Language: en-US' \
  --header 'Content-Type: application/json' \
  --data-raw '{
  "email": "admin@root.com",
  "password": "123Pa$$word!"
}'
```

And here is the response.

``` json
{
  "token": "<your JWT Token>",
  "refreshToken": "<your refresh token>",
  "refreshTokenExpiryTime": "2023-11-25T14:15:33.5187598Z"
}
```

You will need to pass the `token` in the request headers to authenticate calls to the Genocs Library API!

For further steps and details, [Read the Getting Started Guide](https://genocs-blog.netlify.app/templates/general/getting-started/)

## Containerization

The API project, being .NET 9.0, it is configured to have built-in support for containerization. That means, you really don't need a Dockerfile to containerize the webapi.

To build a docker image, all you have to do is, ensure that docker-desktop or docker instance is running. And run the following command at the root of the solution.

``` bash
make publish
```

You can also push the docker image directly to dockerhub or any supported registry by using the following command.

``` bash
make publish-to-hub
```

You will have to update your docker registry / repo url in the Makefile though!.

## Docker Compose

This project also comes with examples of docker compose files, where you can spin up the webapi and database isntance in your local containers with the following commands.

``` bash
make dcu #docker compose up - Boots up the webapi & postgresql container
make dcd #docker compose down - Shuts down the webapi & postgresql containers
```

There are also examples for mysql & mssql variations of the Genocs webapi. You can find the other docker-compose files under the ./docker-compose folder. Read more about [Genocs Library's docker-compose instructions & files here](./docker-compose/README.md)

## Cloud Deployment with Terraform + AWS ECS

This is something you wont get to see very often with templates. But, we do support cloud deployment to AWS using terraform. The terraform files are available at the `./terraform` folder.

### Prerequisites

- Install Terraform
- Install & Configure AWS CLI profiles to allow terraform to provision resources for you. I have made a video about [AWS Credentials Management](https://www.youtube.com/watch?v=oY0-1mj4oCo&ab_channel=Genocs).

In brief, the terraform folder has 2 sub-folders.

- backend
- environments/staging

The Backend folder is internally used by Terraform for state management and locking. There is a one-time setup you have to do against this folder. Navigate to the backend folder and run the command.

``` bash
terraform init
terraform apply -auto-approve
```

This would create the required S3 Buckets and DDB table for you.

Next is the `environments/staging` folder. Here too, run the following command.

``` bash
terraform init
```

Once done, you can go the terraform.tfvars file to change the variables like,

- project tags
- docker image name
- ecs cluster name and so on.

After that, simply back to the root of the solution and run the following command.

``` bash
make ta
```

This will evaluate your terraform files and create a provision plan for you. Once you are ok, type in `yes` and the tool will start to deploy your .NET WebAPI project as containers along with a RDS PostgreSQL intance. You will be receiving the hosted api url once the provisioning is completed!

To destroy the deployed resources, run the following

``` bash
make td
```

## Important Links & Documentations

Overview - [Read](https://genocs-blog.netlify.app/templates/general/overview/)

Getting Started - [Read](https://genocs-blog.netlify.app/templates/general/getting-started/)

Development Environment - [Learn about setting up the DEV environment](https://genocs-blog.netlify.app/templates/general/development-environment/)

Participate in Discussions - [QNA & General Discussions](https://github.com/genocs-blog.netlify.app/templates/discussions)


## Changelogs

[View Complete Changelogs.](https://github.com/genocs-blog.netlify.app/templates/blob/main/CHANGELOGS.md)

## Community

- Discord [@genocs-library](https://discord.gg/fWwArnkV)
- Facebook Page [@GenocsCommunity](https://facebook.com/Genocs)
- Youtube Channel [@Genocs](https://youtube.com/c/Genocs)

## Contributors

Submit your PR and join the elite list!

<a href="https://github.com/Genocs/genocs-library/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Genocs/genocs-library" />
</a>

## License

This project is licensed with the [MIT license](https://github.com/Genocs/genocs-library-docs/templates/blob/main/LICENSE).

## Support ⭐

Has this Project helped you learn something New? or Helped you at work?
Here are a few ways by which you can support.

- Leave a star! ⭐
- Recommend this awesome project to your colleagues. 🥇
- Do consider endorsing me on LinkedIn for ASP.NET Core - [Connect via LinkedIn](https://genocs.com/linkedin) 🦸
- Sponsor the project - [opencollective/genocs](https://opencollective.com/genocs) ❤️
- Or, [consider buying me a coffee](https://www.buymeacoffee.com/genocs)! ☕
