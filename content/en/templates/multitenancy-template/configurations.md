---
title: "Configurations"
description: "Understanding Configurations in Genocs Library's Microservice Template."
lead: "Understanding Configurations in Genocs Library's Microservice Template."
date: 2023-05-13 10:26:50+02:00
lastmod: 2024-08-21 14:50:50+02:00
draft: false
images: []
menu:
  templates:
    identifier: "configurations"
    name: "Configurations"
    parent: "multitenancy-dotnet-template"
weight: 3
toc: true
---

The configuration files are used to manage the application settings. The configuration files are stored in the `Configurations` folder where there are different configuration files for different areas of the application. The `Startup` class is responsible for loading all the configuration files. 


>The classic `appsettings.json` configuration file is still available to manage custom parameters.

The configuration folder is located in the Host project.

## General Structure

``` bash
├── Host.csproj
│   ├── Configurations
│   |   ├── cache.json
│   |   ├── cors.json
│   |   ├── database.json
│   |   ├── hangfire.json
│   |   ├── logger.json
│   |   ├── mail.json
│   |   ├── middleware.json
│   |   ├── openapi.json
│   |   ├── security.json
│   |   ├── securityheaders.json
│   |   └── signalr.json
|   ├── appsettings.json
|
```


The **`Startup` class** inside the folder is responsible for loading all the configuration files described above.

## Cache

By default, the application uses in-memory cache. To enable Distributed caching with Redis, set the `UseDistributedCache` and `PreferRedis` to true and give a valid redis url!

```json
{
  "CacheSettings": {
    "UseDistributedCache": false,
    "PreferRedis": false,
    "RedisURL": "localhost:6379"
  }
}
```

## CORS

Depends on the client consuming the WebAPI.

```json
{
  "CorsSettings": {
    "Angular": "http://localhost:4200",
    "Blazor": "https://localhost:5002;https://www.mydomain.my",
    "React": "http://localhost:3000"
  }
}
```

## Database

By default, the dbprovider is set to postgresql. You will also have to change the connection string that is defined in hangfire.json.

``` json
{
  "DatabaseSettings": {
    "DBProvider": "postgresql",
    "ConnectionString": "Host=localhost;Port=5432;Database=gnxDb;Username=postgres;Password=admin;Include Error Detail=true"
  }
}
```

For details about other database providers, [refer this page](http://localhost:1313/templates/general/getting-started/#setting-up-the-connection-string)

## Localization

The outgoing responses can be localized using this. The client would have to pass the following header to receive localized responses.

``` http
Accept-Language: <local-key>
```

Here, the locale-key can be anything like `fr|de|it` and so on. The default locale is set to english `en`.

``` json
{
  "LocalizationSettings": {
    "EnableLocalization": true,
    "ResourcesPath": "Localization",
    "SupportedCultures": [
      "en-US",
      "en",
      "fr",
      "fr-FR",
      "de",
      "de-DE",
      "it",
      "it-IT",
      "pt",
      "nl",
      "nl-NL"
    ],
    "DefaultRequestCulture": "en",
    "FallbackToParent": true
  }
}
```

## Logger

Genocs Library internally uses Serilog for logging. Here is the configuration for logger.

``` json
{
  "LoggerSettings": {
    "AppName": "Genocs.WebApi",
    "ElasticSearchUrl": "http://localhost:9200",
    "WriteToFile": true,
    "StructuredConsoleLogging": false
  }
}
```

ElasticSearchUrl -> If this is empty, serilog will ignore writing to elastic cache.
WriteToFile -> JSON structured logging to file. These log files can be found under the ./src/Host/Logs folder.
StructuredConsoleLogging -> This can be useful when deploying the application to AWS ECS, for better Cloudwatch logging.

## Mail

We use Ethereal, a fake SMTP Service for mocking email transactions. Don't worry, the included credentials are valid, but you can create your own as well. Check [ethereal](https://ethereal.email/)

``` json
{
  "MailSettings": {
    "DisplayName": "Giovanni Emanuele Nocco",
    "From": "info@genocs.com",
    "Host": "smtp.ethereal.email",
    "Password": "AdEqEKB4QwWX9Xey82",
    "Port": 587,
    "UserName": "nestor91@ethereal.email"
  }
}
```

### Security

TODO: Add more details about the security settings.

``` json
{
  "SecuritySettings": {
    "Provider": "Jwt",
    "RequireConfirmedAccount":true,
    "JwtSettings": {
      "key": "S0M3RAN0MS3CR3T!1!MAG1C!1!",
      "tokenExpirationInMinutes": 60,
      "refreshTokenExpirationInDays": 7
    },
    "AzureAd": {
      "Instance": "https://login.microsoftonline.com/",
      "Domain": "<Your Domain>.onmicrosoft.com",
      "TenantId": "organizations",
      "ClientId": "<Your ClientId of the AzureAd Server App Registration>",
      "Scopes": "access_as_user",
      "RootIssuer": "https://sts.windows.net/<Your AzureAd TenantId>/"
    },
    "Swagger": {
      "AuthorizationUrl": "https://login.microsoftonline.com/organizations/oauth2/v2.0/authorize",
      "TokenUrl": "https://login.microsoftonline.com/organizations/oauth2/v2.0/token",
      "ApiScope": "api://<Your ClientId of the AzureAd Server App Registration>/access_as_user",
      "OpenIdClientId": "<Your ClientId of the AzureAd Client App Registration>"
    }
  }
}
```
