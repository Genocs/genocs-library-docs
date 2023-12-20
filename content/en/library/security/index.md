---
title : "Vault"
description: "Adds the secured and centralized configuration storage integration using Vault."
lead: ""
date: 2023-05-13T15:40:19+02:00
lastmod: 2023-05-13T15:40:19+02:00
draft: false
images: []
menu:
  library:
    identifier: "security"
    name: "Security"
    parent: "library"
weight: 11
toc: true
---



## Installation

``` bash
dotnet add package Genocs.Configurations
```

## Dependencies

- Genocs.Configurations

## Usage

Extend `Program.cs -> CreateDefaultBuilder()` with `UseVault()` that will add the required services and fetch the options from Vault key-value secret storage during an application startup.

``` cs
public static IWebHostBuilder GetWebHostBuilder(string[] args)
    => WebHost.CreateDefaultBuilder(args)
        .ConfigureServices(services => services.AddGenocs().Build())
        .UseVault();
```

## Options

`enabled` - determines whether Vault integration is going to be available.

`url` - URL of the Vault service.

`authType` - authentication type, possible values: token, userpass.

`token` - a secret token used to authenticate to Vault, used when authType = token.

`username` - name of the user used to authenticate to Vault, used when authType = userpass.

`password` - password of the user used to authenticate to Vault, used when authType = userpass.

`kv` - KV storage used for loading JSON settings during application startup.


## Settings

**appsettings.json**

``` json
"vault": {
  "enabled": true,
  "url": "http://localhost:8200",
  "authType": "token",
  "token": "secret",
  "username": "user",
  "password": "secret",
  "kv": {
    "enabled": true,
    "engineVersion": 2,
    "mountPoint": "kv",
    "path": "some-service/settings"
  },
  "pki": {
    "enabled": true,
    "roleName": "some-service",
    "commonName": "some-service.some-app.io"
  },
  "lease": {
    "mongo": {
      "type": "database",
      "roleName": "some-service",
      "enabled": true,
      "autoRenewal": true,
      "templates": {
        "connectionString": "mongodb://:@localhost:27017"
      }
    }
  }
}
```

Beware that storing the secret token or other type of credentials used while authenticating to Vault during an application startup in **appsettings.json** file is not really secure. Instead, you should set these values by using e.g. environment variables when deploying your services to the server/cloud - such scenario can be done in a numerous ways, either by CI/CD tools or even with the usage of manual deployment.

Each setting within the **appsettings.json** file can be overriden with a proper environment variable. You can also override Vault settings with the following (custom) environment variables:

- VAULT_URL
- VAULT_KEY
- VAULT_AUTH_TYPE
- VAULT_TOKEN
- VAULT_USERNAME
- VAULT_PASSWORD