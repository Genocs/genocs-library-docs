---
title : "Authentication - JWT"
description: "Adds the integration with JWT using an available authentication middleware and system components to validate and grant the access tokens."
lead: ""
date: 2023-05-13T15:40:19+02:00
lastmod: 2024-11-30T00:00:00+02:00
draft: false
images: []
menu:
  library:
    identifier: "authentication"
    name: "Authentication"
    parent: "library"
weight: 2
toc: true
---

## Installation

``` bash
dotnet add package Genocs.Auth
```

## Dependencies

- Genocs.Core
- Genocs.Security

## Usage

There are three different ways you can to create the access tokens:

- Using a certificate.
- Using a secret key.
- Using an OpenId external provider.

**Using a certificate** is the most secure way to create the access tokens. The certificate can be stored in the file system or in the Azure Key Vault.

**Using a secret** key is the simplest way to create the access tokens. The secret key is stored in the appsettings.json file.

**Using an OpenId external provider** is the most flexible way to create the access tokens. The OpenId provider can be configured in the `appsettings.json` file.

## JWT authentication with CERTIFICATE

Extend `IGenocsBuilder` with `AddJwt()` that will register the required services.

``` cs
public static IGenocsBuilder RegisterGenocs(this IGenocsBuilder builder)
{
    builder.AddJwt()
    // Other services.

    return builder;
}
```

## JWT authentication with RSA Private key

Extend `IGenocsBuilder` with `AddPrivateKeyJwt()` that will register the required services.

``` cs
public static IGenocsBuilder RegisterGenocs(this IGenocsBuilder builder)
{
    builder.AddPrivateKeyJwt()
    // Other services.

    return builder;
}
```


## JWT authentication with OpenId provider

OpenId official web page: [https://openid.net/](https://openid.net/)

Extend `IGenocsBuilder` with `AddOpenIdJwt()` that will register the required services.

``` cs
public static IGenocsBuilder RegisterGenocs(this IGenocsBuilder builder)
{
    builder.AddOpenIdJwt()
    // Other services.

    return builder;
}
```

Add the use of the authentication middleware in the `ConfigureServices` method of the `Startup` class.
``` cs
public static IGenocsBuilder UseGenocs(this IGenocsBuilder builder)
{
    builder.UseOpenIdJwt()
    // Other services.

    return builder;
}
```

Build an authentication middleware that will validate the access tokens.
``` cs
public static IApplicationBuilder UseFirebaseAuthentication(this IApplicationBuilder builder)
{
    return builder.UseMiddleware<FirebaseAuthenticationMiddleware>();
}
```

Add the use of the authentication middleware in the `Configure` method of the `Startup` class.
``` cs
app.UseFirebaseAuthentication();
```

**NOTE**: Please, make sure that the `System.IdentityModel.Tokens.Jwt` package is NOT installed in the project. If it is, remove it from the project file.

``` cs
    <ItemGroup>
        <PackageReference Include="System.IdentityModel.Tokens.Jwt" Version="7.6.2" />
    </ItemGroup>
``` cs


Then, invoke `UseAuthentication()` extension from `IApplicationBuilder`.

``` cs
public static IApplicationBuilder UseGenocs(this IApplicationBuilder app)
{
    app.UseAuthentication();
    // Other services.

    return app;
}
```

Creating the access tokens can be done by using `IJwtHandler` interface.

``` c#
public class UserService
{
    private readonly IJwtHandler _jwtHandler;

    public UserService(IJwtHandler jwtHandler)
    {
        _jwtHandler = jwtHandler;
    }
    
    public async Task<string> SignInAsync(string email, string password)
    {
        var user = ... //Fetch the user from a custom database
        ValidateCredentials(user, password); //Validate the credentials etc.

        //Generate the token with an optional role and other claims
        var token = _jwtHandler.CreateToken(user.Id, user.Role, user.Claims); 

        return token.AccessToken;
    }
}
```

To blacklist and deactivate the access tokens, use `IAccessTokenService` and invoke `UseAccessTokenValidator()` extension. Blacklisted tokens are kept in Redis cache for the period of their expiry.

## Options

The default section name for the JWT settings is `jwt`. The following options are available: 

- `enabled` - If true then the JWT authentication is enabled.
- `allowAnonymousEndpoints` - If true then the JWT authentication is disabled for the endpoints with the AllowAnonymous attribute.
- `certificate` - Certificate used to issue or just validate the tokens (including private key or just the public one).
- `algorithm` - The algorithm used to sign the tokens.
- `issuer` - A party signing the tokens.
- `issuerSigningKey` - A key used to sign the tokens.
- `validIssuer` - An issuer that can use the access tokens.
- `authority` - The URL of the OpenId provider.
- `audience` - An audience that can use the access tokens.
- `challenge` - The challenge used to authenticate the user.    
- `metadataAddress` - The URL of the OpenId provider metadata.
- `saveToken` - If true then the token will be saved in the authentication properties.
- `saveSigninToken` - If true then the token will be saved in the sign-in properties.
- `requireAudience` - If true then the audience defined in validAudience will be required.
- `requireHttpsMetadata` - If true then the metadata address will be required to use HTTPS.
- `requireExpirationTime` - If true then the expiration time will be required.
- `requireSignedTokens` - If true then the tokens will be required to be signed.
- `expiryMinutes` - How long the token will remain valid.
- `secretKey` - A secret key used to create the access tokens (instead of using the certificate).
- `expiry` - How long the token will remain valid.
- `validateLifetime` - If true then the lifetime defined in expiryMinutes will be validated.
- `validAudience` - An audience that can use the access tokens.
- `validAudiences` - A list of audiences that can use the access tokens.
- `validIssuer` - An issuer that can use the access tokens.
- `validIssuers` - A list of issuers that can use the access tokens.
- `validateActor` - If true then the actor will be validated.
- `validateIssuer` - If true then the issuer defined in validIssuer will be validated.
- `validateTokenReplay` - If true then the token replay will be validated.
- `validateIssuerSigningKey` - If true then the issuer signing key will be validated.
- `refreshOnIssuerKeyNotFound` - If true then the issuer key will be refreshed.
- `includeErrorDetails` - If true then the error details will be included.
- `authenticationType` - The type of the authentication.
- `nameClaimType` - The type of the name claim.
- `roleClaimType` - The type of the role claim.
- `validateAudience` - If true then the audience defined in validAudience will be validated.

## Settings

Use the following settings in the `appsettings.json` file according to your needs

```json
"jwt": {
  "enabled": true,
  "allowAnonymousEndpoints": [
    "/api/healthz",
    "/api/alive"
  ],
  "certificate": {
    "location": "certs/localhost.pfx",
    "password": "test",
    "rawData": ""
  },
  "algorithm": "",
  "issuer": "genocs-auth",
  "issuerSigningKey": "genocs-auth",
  "secretKey": "secret",
  "validIssuer": "genocs-auth",
  "authority": "",
  "audience": "",
  "challenge" : "Bearer",
  "metadataAddress" : "/.well-known/openid-configuration",
  "saveToken": true,
  "saveSigninToken": false,
  "requireAudience": true,
  "requireHttpsMetadata": true,
  "requireExpirationTime": true,
  "requireSignedTokens": true,
  "expiryMinutes": 0,
  "expiry": "01:00:00",
  "validAudience": null,
  "validAudiences": null,
  "validIssuer": null,
  "validIssuers" : null,
  "validateActor" : null,
  "validateAudience" : true,
  "validateIssuer" : true,
  "validateLifetime" : true,
  "validateTokenReplay" : null,
  "validateIssuerSigningKey" : null,
  "refreshOnIssuerKeyNotFound" : true,
  "includeErrorDetails" : true,
  "authenticationType" : null,
  "nameClaimType" : null,
  "roleClaimType" : "Role"
}
```

### Default settings

Default settings for some variable has bee overwritten with the following configuration.

```json
"jwt": {
  "challenge": "Bearer",
  "metadataAddress": "/.well-known/openid-configuration",
  "saveToken": true,
  "requireAudience": true,
  "requireHttpsMetadata": true,
  "requireExpirationTime": true,
  "requireSignedTokens": true,
  "validateAudience": true,
  "validateIssuer": true,
  "validateLifetime": true,
  "refreshOnIssuerKeyNotFound": true,
  "includeErrorDetails": true,
  "roleClaimType" : "Role"
}
```