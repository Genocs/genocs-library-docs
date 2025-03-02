---
title: "Setup Angular with Nginx"
description: "How to setup Angular with Nginx"
lead: "This tutorial will guide you on how to setup Angular with Nginx withing a Docker container"
date: 2025-03-01T00:00:00+02:00
lastmod: 2025-03-01T00:00:00+02:00
draft: false
images: []
menu:
  templates:
    identifier: "angular-guide"
    name: "Setup Angular app in container"
    parent: "tutorials"
weight: 13
toc: true
---


## Introduction

This tutorial will guide you on how to setup Angular with Nginx within a Docker container.
The tutorial will use:
- Angular *(Angular15)* to build the Angular app
- Node.js *(Node22)* to build the Angular app
- Nginx to serve the Angular app
- Docker to containerize the Angular app
- Azure DevOps to build and deploy the Angular app

## Create Nginx Configuration

Add a file named `nginx.conf` in the root of your project with the following content:

```nginx
# the events block is required
events{}

http {
    # include the default mime.types to map file extensions to MIME types
    include /etc/nginx/mime.types;

    server {
        listen 80;
        server_name localhost;

        # set the root directory for the server (we need to copy our
        # application files here)
        root /usr/share/nginx/html;

        # set the default index file for the server (Angular generates the
        # index.html file for us and it will be in the above directory)        
        index index.html;

        # specify the configuration for the '/' location
        location / {

            # try to serve the requested URI. if that fails then try to
            # serve the URI with a trailing slash. if that fails, then
            # serve the index.html file; this is needed in order to serve
            # Angular routes--e.g.,'localhost:8080/customer' will serve
            # the index.html file
            try_files $uri $uri/ /index.html;
        }
    }
}
```

## Create Dockerfile

Create a file named `Dockerfile` in the root of your project with the following content:

```dockerfile
FROM node:22 AS build

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

# Install Angular CLI at version 15
RUN npm i -g @angular/cli@15

# RUN npm install to install all packages
RUN npm install

COPY . .

# Set Arguement for the environment with default value of dev
ARG BUILD_ENV=dev

# Build the app in dev mode. Remember to add a parameter to the dockerfile to build in production mode
RUN npm run build:${BUILD_ENV}

# If you are building your code for production
# RUN npm ci --only=production
# Bundle app source

FROM nginx:alpine
COPY nginx.conf /etc/nginx/nginx.conf
WORKDIR /usr/share/nginx/html
COPY --from=build /usr/src/app/dist/. .

EXPOSE 80

```



## Setup Azure DevOps Pipeline

The solution requres a pipeline to build a Docker image and push it to Azure Container Registry.
The Image will be tagged with the Build Number and latest and will be pushed to the Development, UAT and Production Container Registry based on the Build Environment.

The Pipeline requires three Service Connections to deploy Images to Azure Container Registry
1. AcrDevelopmentConnection
2. AcrUATConnection
3. AcrProductionConnection

The Pipeline requires a parameter to specify the Build Environment:
1. `buildEnv`: "local" # Pass the Build Environment `local | dev | uat | prod`

Create a new pipeline in Azure DevOps and add the following code to the `azure-pipelines\container-ci.yml` file:

```yaml
# ASP.NET Core (.NET Framework)
# Build and test ASP.NET Core projects targeting .NET9.
# Add steps that publish symbols, save build artifacts, and more:
# https://docs.microsoft.com/azure/devops/pipelines/languages/dotnet-core
# The Pipeline requires three Service Connections to deploy Images to Azure Container Registry
# 1. AcrDevelopmentConnection
# 2. AcrUATConnection
# 3. AcrProductionConnection

# The Pipeline requires a parameter to specify the Build Environment
# 1. buildEnv: "local" # Pass the Build Environment local | dev | uat | prod

name: $(Build.BuildId)

trigger:
  - Develop
  - main

resources:
  - repo: self

parameters:
  buildEnv: "local" # Pass the Build Environment local | dev | uat | prod

variables:
  # Agent VM image name
  vmImageName: "ubuntu-latest"
  imageName: "frontend-$(buildEnv)"
  registry: "youracr$(buildEnv).azurecr.io"
  repository: "$(registry)/$(imageName)-$(buildEnv)" # yourazurecontainerregistry.azurecr.io/frontend-dev:1
  dockerfile: Dockerfile # Path to your Dockerfile

stages:
  - stage: BuildAndPush
    displayName: Build and Push Docker Image
    jobs:
      - job: Build
        displayName: Build Docker Image
        pool:
          vmImage: $(vmImageName)
        steps:
          - task: Docker@2
            displayName: Build Image
            inputs:
              command: build
              repository: $(repository)
              tags: "$(Build.BuildId),latest" # Use build number as tag
              Dockerfile: $(dockerfile)
              buildArgs: "--build-arg BUILD_ENV=$(buildEnv)" # Pass the Build Environment local | dev | uat | prod

          - task: Docker@2
            displayName: Push Image To DEV
            condition: eq(parameters.buildEnv, 'dev')
            inputs:
              command: push
              containerRegistry: "AcrDevelopmentConnection"
              repository: $(repository)
              tags: "$(Build.BuildId),latest"


          - task: Docker@2
            displayName: Push Image To UAT
            condition: eq(parameters.buildEnv, 'uat')
            inputs:
              command: push
              containerRegistry: "AcrUATConnection"
              repository: $(repository)
              tags: "$(Build.BuildId),latest"

          - task: Docker@2
            displayName: Push Image To PROD
            condition: eq(parameters.buildEnv, 'prod')
            inputs:
              command: push
              containerRegistry: "AcrProductionConnection"
              repository: $(repository)
              tags: "$(Build.BuildId),latest"

```

## Conclusion
Enjoy your Angular app running in a container with Nginx. 
