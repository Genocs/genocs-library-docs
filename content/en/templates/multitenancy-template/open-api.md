---
title: "OpenAPI"
description: "How to use documentation to be fully compliant with OpenApi."
lead: "Genocs's Web API and OpenApi."
date: 2021-08-24T11:40:05+05:30
lastmod: 2021-10-28T10:07:45+05:30
draft: false
images: []
menu:
  templates:
    identifier: "open-api"
    name: "OpenAPI"
    parent: "multitenancy-dotnet-template"
weight: 11
toc: true
---

Genocs's Web API and OpenApi.

Genocs Web API is fully compliant with OpenApi. This means that you can use the Swagger UI to test your API and generate client code for your application.
You can also use the OpenApi specification to generate client code for your application.
The doumentation is generated automatically from the code. You can use both ReDoc and Swagger UI to test your API. 

## Configuration

The configuration is done in the `appsettings.json` file. You can enable or disable the Swagger UI and ReDoc. You can also set the name, title, version, description, route prefix, contact name, contact email, contact url, license name, license url, terms of service, include security, serialize as OpenApiV2, and servers.

```json
  "swagger": {
    "enabled": true,
    "reDocEnabled": false,
    "name": "Orders",
    "title": "Orders Service",
    "version": "v002",
    "description": "Orders Service",
    "routePrefix": "swagger",
    "contactName": "Giovanni Nocco",
    "contactEmail": "giovanni.nocco@genocs.com",
    "contactUrl": "https://www.genocs.com",
    "licenseName": "MIT",
    "licenseUrl": "https://www.genocs.com/license.html",
    "termsOfService": "https://www.genocs.com/terms_and_conditions.html",
    "includeSecurity": true,
    "serializeAsOpenApiV2": true,
    "servers": [
      {
        "url": "http://localhost:5300",
        "description": "Local version to be used for development"
      },
      {
        "url": "http://fiscanner-api",
        "description": "Containerized version to be used into with docker or k8s"
      },
      {
        "url": "https://fiscanner-api.azurewebsites.net",
        "description": "Production deployed on Azure"
      }
    ]
  }

```