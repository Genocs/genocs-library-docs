---
title : "Azure Key Vault"
description: "Genocs Library package for Azure Key Vault"
lead: ""
date: 2023-11-29T21:00:19+02:00
lastmod: 2024-11-17T00:00:00+02:00
draft: false
images: []
menu:
  library:
    identifier: "azure-key-vault"
    name: "Azure Key Vault"
    parent: "library"
weight: 3
toc: true
---


### Overview
This package is used to configure Azure Key Vault in the application. It uses the `Microsoft.Extensions.Configuration.AzureKeyVault` package to configure the Azure Key Vault.

The only thing you need to do is to add the package and set the configuration in the `appsettings.json` file. You can use *User Assigned Managed Identity* or *System Assigned Managed Identity* to access the Azure Key Vault, as well as you can setup RBAC long with Azure EntraID.

For more information about Azure Key Vault, please visit the [Azure Key Vault documentation](https://docs.microsoft.com/en-us/azure/key-vault/), or you can check on the personal blog how to [configure Azure Key Vault in the application](https://genocs.github.io/2022/03/19/azurekeyvault.html).


### Installation

```bash
dotnet add package Genocs.Secrets.AzureKeyVault
```

## Dependencies

- Genocs.Core

### Usage

Extend Program.cs -> use WebHostBuilder or HostBuilder to setup the Azure Key Vault configuration.

You can use different ways to setup the Azure Key Vault.
1. By using Managed Identity (User Assigned Managed Identity or System Assigned Managed Identity)
2. By using RBAC (Role Based Access Control)
3. By using Certificate


#### Managed Identity or RBAC
``` cs
builder.Host
        .UseAzureKeyVault();
```

#### Certificate
``` cs
builder.Host
        .UseAzureKeyVaultWithCertificate();
```


### Options

- `enabled` - Enable or disable the Azure Key Vault configuration. Default is false
- `name` - Sets the key vault name to be used. If the key vault url is `https://kyvault.vault.azure.net/` then the name is `kyvault`.
- `managedIdentityId` - Sets the managed identity id to be used. You can find the managed identity id in the Azure portal. The managed identity id is the object id of the managed identity.
- `azureADCertThumbprint` - The client id. To be used with *Certificate authentication*.
- `azureADApplicationId` - The Active Directory Application id. To be used with *Certificate authentication*.
- `azureADDirectoryId` - The Azure EntraID tenant Id. To be used with *Certificate authentication*.


> **NOTE:** 
>
> In case of RBAC, you don't need to set the managed identity id.


Use the following settings in the `appsettings.json` file according to your needs

```json
  "azureKeyVault": {
    "enabled": false,
    "name": "kyvault",
    "managedIdentityId": "your-managed-identity-id",
    "azureADCertThumbprint": "your-certificate-thumbprint",
    "azureADApplicationId": "your-application-id",
    "azureADDirectoryId": "your-directory-id"
  }
```