---
title: "Authentication & Authorization"
description: ".NET10.0 - Boilerplate API Tutorial with Email Sign Up, Verification, Authentication & Forgot Password"
lead: "Introducing about how to use authentication and authorization with NET10.0."
date: 2024-12-09T00:00:00+02:00
lastmod: 2024-12-09T00:00:00+02:00
draft: false
weight: 10
images: ["say-hello-to-doks.png"]
contributors: [Giovanni Emanuele Nocco"]
---


## .NET 6.0 Boilerplate Overview
The boilerplate API allows you to register a user account, login and perform different actions based on your role. The **Admin** role has full access to manage (add/edit/delete) any account in the system, the **User** role has access to update/delete their own account. The first account registered is automatically assigned the **Admin** role and subsequent registrations are assigned the **User** role.

On registration the API sends a verification email with a token and instructions to the account email address, accounts must be verified before they can authenticate. SMTP settings for email are configured in *appsettings.json*. If you don't have an SMTP service, for quick testing you can use the fake SMTP service [ethereal](https://ethereal.email/) to create a temporary inbox, just click *Create Ethereal Account* and copy the SMTP configuration options.

### Authentication implementation overview
Authentication is implemented with JWT access tokens and refresh tokens. On successful authentication the API returns a short lived JWT access token that expires after 15 minutes, and a refresh token that expires after 7 days in an HTTP Only cookie. The JWT is used for accessing secure routes on the API and the refresh token is used for generating new JWT access tokens when (or just before) they expire.

HTTP Only cookies are used for refresh tokens to increase security because they are not accessible to client-side javascript which prevents XSS (cross site scripting) attacks. Refresh tokens only have access to generate new JWT tokens (via the */accounts/refresh-token route*), they cannot perform any other secure action which prevents them from being used in CSRF (cross site request forgery) attacks.

### API endpoints
The example .NET10.0 API has the following endpoints/routes to demonstrate email sign up and verification, authentication and role based autorization, refreshing and revoking tokens, forgot password and reset password, and secure account management routes:

- POST `/accounts/authenticate` - public route that accepts POST requests containing an email and password in the body. On success a JWT access token is returned with basic account details, and an HTTP Only cookie containing a refresh token.
- POST `/accounts/refresh-token` - public route that accepts POST requests containing a cookie with a refresh token. On success a new JWT access token is returned with basic account details, and an HTTP Only cookie containing a new refresh token (see refresh token rotation just below for an explanation).
- POST `/accounts/revoke-token` - secure route that accepts POST requests containing a refresh token either in the request body or in a cookie, if both are present priority is given to the request body. On success the token is revoked and can no longer be used to generate new JWT access tokens.
- POST `/accounts/register` - public route that accepts POST requests containing account registration details. On success the account is registered and a verification email is sent to the email address of the account, accounts must be verified before they can authenticate.
- POST `/accounts/verify-email` - public route that accepts POST requests containing an account verification token. On success the account is verified and can now login.
- POST `/accounts/forgot-password` - public route that accepts POST requests containing an account email address. On success a password reset email is sent to the email address of the account. The email contains a single use reset token that is valid for one day.
- POST `/accounts/validate-reset-token` - public route that accepts POST requests containing a password reset token. A message is returned to indicate if the token is valid or not.
- POST `/accounts/reset-password` - public route that accepts POST requests containing a reset token, password and confirm password. On success the account password is reset.
- GET `/accounts` - secure route restricted to the Admin role that accepts GET requests and returns a list of all the accounts in the application.
- POST `/accounts` - secure route restricted to the Admin role that accepts POST requests containing new account details. On success the account is created and automatically verified.
- GET `/accounts/{id}` - secure route that accepts GET requests and returns the details of the account with the specified id. The Admin role can access any account, the User role can only access their own account.
- PUT `/accounts/{id}` - secure route that accepts PUT requests to update the details of the account with the specified id. The Admin role can update any account including its role, the User role can only update there own account details except for role.
- DELETE `/accounts/{id}` - secure route that accepts DELETE requests to delete the account with the specified id. The Admin role can delete any account, the User role can only delete their own account.
Refresh token rotation
Each time a refresh token is used to generate a new JWT token (via the /accounts/refresh-token route), the refresh token is revoked and replaced by a new refresh token. This technique is known as Refresh Token Rotation and increases security by reducing the lifetime of refresh tokens, which makes it less likely that a compromised token will be valid (or valid for long). When a refresh token is rotated the new token is saved in the ReplacedByToken field of the revoked token to create an audit trail in the database.

Revoked and expired refresh token records are kept in the database for the number of days set in the RefreshTokenTTL property in the appsettings.json file. The default is 2 days, after which old inactive tokens are deleted by the account service in the Authenticate() and RefreshToken() methods.

## Revoked token reuse detection
If an attempt is made to generate a new JWT token using a revoked refresh token, the API treats this as a potentially malicious user with a stolen (revoked) refresh token, or a valid user attempting to access the system after their token has been revoked by a malicious user with a stolen (active) refresh token. In either case the API revokes all descendant tokens because the token and its descendants were likely created on the same device which may have been compromised. The reason revoked is recorded as "Attempted reuse of revoked ancestor token" against the revoked tokens in the database.

## SQL database setup and configuration
To try to keep things simple the boilerplate API uses a SQLite database, SQLite is self-contained and doesn't require a full database server to be installed. The database is automatically created on startup in the Program.cs file by triggering the execution of the EF Core migrations in the /Migrations folder.

## Code on GitHub
The boilerplate API project is available on GitHub at https://github.com/cornflourblue/dotnet-6-signup-verification-api.


Tools required to run the .NET10.0 Tutorial Example Locally
To develop and run .NET10.0 applications locally, download and install the following:

.NET SDK - includes the .NET runtime and command line tools
Visual Studio Code - code editor that runs on Windows, Mac and Linux
C# extension for Visual Studio Code - adds support to VS Code for developing .NET applications

### Install dotnet ef tools
The .NET Entity Framework Core tools (dotnet ef) are used to generate EF Core migrations, to install the EF Core tools globally run dotnet tool install -g dotnet-ef, or to update run dotnet tool update -g dotnet-ef.

For more info on EF Core tools see https://docs.microsoft.com/ef/core/cli/dotnet.

For more info on EF Core migrations see https://docs.microsoft.com/ef/core/managing-schemas/migrations.


## Run the .NET 6.0 Boilerplate API Locally
Download or clone the tutorial project code from https://github.com/cornflourblue/dotnet-6-signup-verification-api
Configure SMTP settings for email within the AppSettings section in the /appsettings.json file. For quick testing you can create a temporary inbox at https://ethereal.email/ and copy the SMTP configuration options.
Start the API by running dotnet run from the command line in the project root folder (where the WebApi.csproj file is located), you should see the message Now listening on: http://localhost:4000, and you can view the Swagger API documentation at http://localhost:4000/swagger.
Follow the instructions below to test with Postman or hook up with one of the example single page applications available (Angular or React).

### Debugging in VS Code
You can start the application in debug mode in VS Code by opening the project root folder in VS Code and pressing F5 or by selecting Debug -> Start Debugging from the top menu. Running in debug mode allows you to attach breakpoints to pause execution and step through the application code. For more info on debugging .NET in VS Code see VS Code + .NET - Debug a .NET Web App in Visual Studio Code.

### Before running in production
Before running in production also make sure that you update the Secret property in the appsettings.json file, it is used to sign and verify JWT tokens for authentication, change it to a random string to ensure nobody else can generate a JWT with the same secret and gain unauthorized access to your api. A quick and easy way is join a couple of GUIDs together to make a long random string (e.g. from https://www.guidgenerator.com/).


## Run an Angular App with the .NET 6.0 Boilerplate API
For full details about the boilerplate Angular app see the post Angular 15 Auth Boilerplate - Sign Up with Verification, Login and Forgot Password. But to get up and running quickly just follow the below steps.

Download or clone the Angular tutorial code from https://github.com/cornflourblue/angular-15-signup-verification-boilerplate
Install all required npm packages by running npm install from the command line in the project root folder (where the package.json is located).
Remove or comment out the line below the comment // provider used to create fake backend located in the /src/app/app.module.ts file.
Start the application by running npm start from the command line in the project root folder, this will launch a browser displaying the application and it should be hooked up with the .NET 6 Boilerplate API that you already have running.

## Run a React App with the .NET 6.0 Boilerplate API
For full details about the boilerplate React app see the post React Boilerplate - Email Sign Up with Verification, Authentication & Forgot Password. But to get up and running quickly just follow the below steps.

Download or clone the React tutorial code from https://github.com/cornflourblue/react-signup-verification-boilerplate
Install all required npm packages by running npm install or npm i from the command line in the project root folder (where the package.json is located).
Remove or comment out the 2 lines below the comment // setup fake backend located in the /src/index.jsx file.
Start the application by running npm start from the command line in the project root folder, this will launch a browser displaying the application and it should be hooked up with the .NET 6 Boilerplate API that you already have running.

## Test the .NET 6.0 Boilerplate API with Postman
Postman is a great tool for testing APIs, you can download it at [postman](https://www.postman.com/downloads).

Below are instructions on how to use Postman to perform the following actions:

1. Register a new account
2. Verify an account
3. Access an account with a forgotten password
4. Reset the password of an account
5. Authenticate to get a JWT token and a refresh token
6. Get a list of all accounts
7. Update an account
8. Use a refresh token to get a new JWT token
9. Revoke a refresh token
10. Delete an account

How to register a new account with Postman
To register a new account with the boilerplate API follow these steps:

Open a new request tab by clicking the plus (+) button at the end of the tabs.
Change the HTTP method to POST with the dropdown selector on the left of the URL input field.
In the URL field enter the address to the register route of your local API - http://localhost:4000/accounts/register
Select the Body tab below the URL field, change the body type radio button to raw, and change the format dropdown selector to JSON.
Enter a JSON object containing the required account properties in the Body textarea, e.g:

```json
{
    "title": "Mr",
    "firstName": "George",
    "lastName": "Costanza",
    "email": "george@costanza.com",
    "password": "george-likes-spicy-chicken",
    "confirmPassword": "george-likes-spicy-chicken",
    "acceptTerms": true
}
```
Click the Send button, you should receive a "200 OK" response with a "registration successful" message in the response body.
Here's a screenshot of Postman after the request is sent and the account has been registered:


And this is a screenshot of the verification email received with the token to verify the account:





https://jasonwatmore.com/post/2022/02/26/net-6-boilerplate-api-tutorial-with-email-sign-up-verification-authentication-forgot-password
