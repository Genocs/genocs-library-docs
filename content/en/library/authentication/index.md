---
title : "Authentication - JWT"
description: "Adds the integration with JWT using an available authentication middleware and system components to validate and grant the access tokens."
lead: ""
date: 2023-05-13T15:40:19+02:00
lastmod: 2023-06-25T15:40:19+02:00
draft: false
images: []
menu:
  library:
    identifier: "authentication"
    name: "Authentication"
    parent: "library"
weight: 1
toc: true
---

## Installation

``` bash
dotnet add package Genocs.Auth
```

## Dependencies

- Genocs.Core
- Genocs.Persistence.Redis

## Usage

Extend `IGenocsBuilder` with `AddJwt()` that will register the required services.

``` cs
public static IGenocsBuilder RegisterGenocs(this IGenocsBuilder builder)
{
    builder.AddJwt()
    // Other services.

    return builder;
}
```

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

`certificate` - certificate used to issue or just validate the tokens (including private key or just the public one).

`secretKey` - a secret key used to create the access tokens (instead of using the certificate).

`issuer` - a party signing the tokens.

`expiry` - how long the token will remain valid.

`validateLifetime` - if true then the lifetime defined in expiryMinutes will be validated.

`validAudience` - an audience that can use the access tokens.

`validateAudience` - if true then the audience defined in validAudience will be validated.

## Settings

**appsettings.json**

``` json
"jwt": {
  "certificate": {
    "location": "certs/localhost.pfx",
    "password": "test",
    "rawData": ""
  },
  "secretKey": "secret,
  "issuer": "genocs-auth",
  "validIssuer": "genocs-auth",
  "validateAudience": false,
  "validateIssuer": true,
  "validateLifetime": true,
  "expiry": "01:00:00"
}
```
