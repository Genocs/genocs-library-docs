---
title: "Authorization"
description: "Adds the integration with authorization middleware and system components to validate and grant the access to the resources."
lead: ""
date: 2023-05-13T15:40:19+02:00
lastmod: 2025-10-11T16:18:19Z
draft: false
images: []
menu:
  library:
    identifier: "authorization"
    name: "Authorization"
    parent: "library"
weight: 2
toc: true
---

## Installation

```bash
dotnet add package Genocs.Auth
```

## Dependencies

- Genocs.Core
- Genocs.Security

## Usage

This module provides the integration with authorization middleware and system components to validate and grant the access to the resources.

The Genocs Authorization module provides the following features:

- Authorization middleware
- Authorization system components
- Authorization policies
- Authorization handlers
- Authorization attributes


In order to provide multiple authorization strategies and to be able to authorize the access to the resource for different purposes like FrontEnd Application and/or MCP services, the Genocs Authorization module provides the following features:

- Authorization for FrontEnd Application
- Authorization for MCP services


The Authorization is made by using endpoint decorators and policies.

## How to enable the authorization
Extend `IGenocsBuilder` with `AddOpenIdJwt()` that will register the required services.

```cs
public static IGenocsBuilder RegisterGenocs(this IGenocsBuilder builder)
{
    builder.AddOpenIdJwt()
    // Other services.
    

    // Return the Genocs builder to be used to chain other services
    return builder;
}


public static IApplicationBuilder UseCustomAuthentication(this IApplicationBuilder builder)
{
    // Custom middleware to allow both Jwt and ApiKey authentication
    builder.UseMiddleware<JwtOrApiKeyAuthenticationMiddleware>();

    // Return the Application builder to be used to chain other services
    return builder;
}
```

### Endpoint decorators

Upone the registration of the authorization services, you can use the following decorators to authorize the access to the resources:

```cs
[ApiKeyOrJwtAuthorize]
```

```cs
[Authorize(Roles = "Editor")]
```

### Example

The example below shows how to authorize the access to the resources using the `Authorize` decorator, you can also use the `ApiKeyOrJwtAuthorize` decorator to authorize the access to the resources using the `ApiKey` or `Jwt` authentication.


```cs
    /// <summary>
    /// Retrieves authorization information for the authenticated user.
    /// </summary>
    /// <remarks>
    /// <para>
    /// This endpoint demonstrates JWT authorization by returning the authorization header
    /// from the authenticated request. It serves as a simple test to verify that JWT
    /// authentication is working correctly.
    /// </para>
    /// <para>**Important:** This endpoint requires the user to have the 'Editor' role.</para>
    /// <para>Sample request:</para>
    /// <para>
    ///     GET /JwtAuthorized
    ///     Authorization: Bearer your-jwt-token-here
    /// </para>
    /// 
    /// </remarks>
    /// <returns>A string containing the authorization header value from the request.</returns>
    /// <response code="200">Returns the authorization header information successfully.</response>
    /// <response code="401">Unauthorized - Invalid or missing JWT token.</response>
    /// <response code="403">Forbidden - Valid token but user lacks the required 'Editor' role.</response>
    [HttpGet("")]
    [Authorize(Roles = "Editor")]
    [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status401Unauthorized)]
    [ProducesResponseType(StatusCodes.Status403Forbidden)]
    public async Task<IActionResult> GetAuthorizedAsync()
    {
        _logger.LogInformation("Processing authorized request for user");

        return await Task.Run(() => Ok($"Done! Authorization is: {HttpContext.Request.Headers.Authorization}"));
    }
```


## Options

The default section name for the authorization settings is `authorization`. The following options are available:

- `enabled` - If true then the authorization is enabled.
- `devApiKey` - The API key used to authorize the client in the development environment.
- `apiKeys` - A list of API keys that can be used to authorize the client.


## Settings

Use the following settings in the `appsettings.json` file according to your needs

```json
  "authorization": {
    "enabled": true,
    "devApiKey": "dev_api_key",
    "apiKeys": [
      "prod_api_key_1",
      "prod_api_key_2"
    ]
  }
```

### Default settings

Default settings for some variable has bee overwritten with the following configuration.

```json
  "authorization": {
    "enabled": true,
    "devApiKey": "abc_123",
    "apiKeys": [
      "prod_api_key_1",
      "prod_api_key_2"
    ]
  }
```
