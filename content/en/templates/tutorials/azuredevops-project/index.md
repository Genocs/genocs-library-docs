---
title: "Setup Azure DevOps Project"
description: "How to setup Azure DevOps project"
lead: "This tutorial will guide you on how to setup Azure DevOps project"
date: 2025-03-01T00:00:00+02:00
lastmod: 2025-03-01T00:00:00+02:00
draft: false
images: []
menu:
  templates:
    identifier: "azuredevops-guide"
    name: "Setup Azure DevOps Project"
    parent: "tutorials"
weight: 14
toc: true
---


## Introduction

1. Create a new project onto Azure DevOps [Genocs](https://dev.azure.com/genocs)
2. Name it **MyProject**
   - Setup project type *Scrum*
3. Add project description
4. Add Note on the wiki
5. Setup Board
   - Add **Epic**: Demo SetUp
   - Add **Feature**: Setup Demo Application
   - Add **PBI** (Product Backlog Item)

6. Setup Git repositories
   - Setup *Company.Project.DemoApi* Github repository
   - Setup *Company.Project.DemoFE* Github repository
   
7. Create project *Company.Project.DemoApi* locally
8. Create project *Company.Project.DemoFE* locally
   - Show how the commits works (add task Id to the commit)

9. Setup Azure Build Pipeline for app service - DemoApi
   - Show the notification by email upon pipeline completition
   - Show test result

10. Setup Azure Build Pipeline for Docker - DemoApi
11. Setup Azure Deploy Pipeline for Docker - DemoApi
12. Deploy DemoApi Docker app service to Azure:
   - subscription: *gnx Sponsorship*
   - location: *Italy North*
   - resource group: *rg-demo*
   - app service plan: *asp-demo*
   - app service: *gnx-demo-api*



## Useful git commands

Following command allows you to setup local git repo

```bash
git init
git add .
git commit -m "Initial commit"

# switch to develop branch (-b create a new branch if it's doesn't exist) 
git checkout -b develop

# add remote repository
git remote add origin https://genocs@dev.azure.com/genocs/Project/_git/Company.Project.DemoApi
git remote add origin https://genocs@dev.azure.com/genocs/Project/_git/Company.Project.DemoFE

# push the develop branch to the remote repository
git push -u origin develop

# remove origin in case you want to change the remote repository
git remote delete origin
```


## Build pipeline yaml files

There are two build pipeline yaml files that you can use to setup the build pipeline for the project.
One is for the app service and the other is for the docker image.


### App Service Build Pipeline

Before run pipeline please check the variables:

> **General variables** 
> 1. BuildConfiguration *(Release or Debug)*
>    {{< img src="library_variables.png" >}}
>
>    {{< img src="library_variable.png" >}}
> 
> **Library variables**
> 1. azureSubscription *(Only for deployment to Azure)*
> 
> **Pipeline variables**
> 1. majorVer
> 2. minorVer
> 3. appServiceName *(Only for deployment to Azure)*
----

Add file `azure-pipelines\app-service-ci.yml` to the root of the project

```yaml
# ASP.NET Core (.NET Framework)
# Build and test ASP.NET Core projects targeting .NET9.
# Add steps that publish symbols, save build artifacts, and more:
# https://docs.microsoft.com/azure/devops/pipelines/languages/dotnet-core

# Before run pipeline please check the variables
# *** General variables ***
# BuildConfiguration (Release or Debug)

# *** Library variables ***
# azureSubscription (Only for deployment to Azure)

# *** Pipeline variables ***
# majorVer
# minorVer
# appServiceName (Only for deployment to Azure)

# Changing the name the variable $(Build.BuildNumber) will change as well
name: $(majorVer).$(minorVer)$(Rev:.r)

trigger:
  - main

pool:
  vmImage: ubuntu-latest

variables:
  - group: General
  - name: buildConfiguration
    value: "Release"
  - name: version
    value: "$(Build.BuildNumber)" # This variable is used to update the nuget version

# Single stage Build section
steps:
  - task: UseDotNet@2
    displayName: "Use NET9"

    inputs:
      version: "9.0.x"
      includePreviewVersions: true # Required for preview versions

  - task: NuGetAuthenticate@1
    displayName: "NuGet Authenticate"

  - task: DotNetCoreCLI@2
    displayName: "Build projects"
    inputs:
      command: "build"
      projects: "**/*.csproj"
      arguments: "--configuration $(BuildConfiguration)" # Update this to match your need

  # Run the Test (after building)
  - task: DotNetCoreCLI@2
    displayName: "Run tests"
    inputs:
      command: "test"
      projects: "**/*Tests/*.csproj"
      arguments: '--configuration $(buildConfiguration) --collect:"Code Coverage" -- DataCollectionRunSettings.DataCollectors.DataCollector.Configuration.Format=cobertura'
      publishTestResults: true

  # Publish the artifact to be ready for deploy
  - task: DotNetCoreCLI@2
    displayName: Publish
    inputs:
      command: "publish"
      publishWebProjects: true

  - task: CopyFiles@2
    displayName: "Copy file"
    inputs:
      targetFolder: "$(Build.ArtifactStagingDirectory)"

  - task: PublishBuildArtifacts@1
    displayName: "Publish Artifact: drop"
    inputs:
      pathToPublish: "$(Build.ArtifactStagingDirectory)"
# Deploy the artifact on Azure
# Please move this step to the release pipeline
#- task: AzureRmWebAppDeployment@4
#  displayName: 'Deploy Azure App Service'
#  inputs:
#    connectionType: 'AzureRM'
#    azureSubscription: '$(AzureSubscription)'
#    appType: 'webAppLinux'
#    webAppName: '$(AppServiceName)'
#    packageForLinux: '$(System.DefaultWorkingDirectory)/**/*.zip'
#    runtimeStack: 'DOTNETCORE|9.0'
```

### Docker Build Pipeline

The Pipeline requires a Service Connections to deploy Images to Azure Container Registry.
1. `Service Connections`: AcrDevelopmentConnection


Add file `azure-pipelines\app-container-ci.yml` to the root of the project

```yaml
# ASP.NET Core (.NET Framework)
# Build and test ASP.NET Core projects targeting .NET9.
# Add steps that publish symbols, save build artifacts, and more:
# https://docs.microsoft.com/azure/devops/pipelines/languages/dotnet-core

name: $(Build.BuildId)

trigger:
  - main

resources:
  - repo: self

variables:
  # Agent VM image name
  vmImageName: "ubuntu-latest"
  imageName: backend # Replace with your image name
  registry: genocs # Replace with your Docker registry (e.g., Docker Hub, ACR)
  repository: $(registry)/$(imageName)
  dockerfile: Dockerfile # Path to your Dockerfile
  buildArgValue: "--build-arg BUILD_ENV=$(buildEnv)" # Use this to pass the build environment to the Dockerfile

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
              buildArgs: buildArgValue # Pass the the build argument
              # Add other build options as needed, e.g., target, context
              # buildContext: .  # Uncomment if your Dockerfile is not in the root of the repo
              # target: my-target # Uncomment if you are using multi-stage builds

          - task: Docker@2
            displayName: Push Image
            inputs:
              command: push
              containerRegistry: "AcrDevelopmentConnection"
              repository: $(repository)
              tags: "$(Build.BuildId),latest"
```


```yaml
# ASP.NET Core (.NET Framework)
# Build and test ASP.NET Core projects targeting .NET9.
# Add steps that publish symbols, save build artifacts, and more:
# https://docs.microsoft.com/azure/devops/pipelines/languages/dotnet-core

# Before run pipeline please check the variables
# *** Service Connection ***
# AcrConnectionDev (Service connection to Azure Container Registry for development)
# AcrConnectiionUAT (Service connection to Azure Container Registry for UAT)
# AcrConnectionProd (Service connection to Azure Container Registry for production)

# *** General variables ***
# BuildConfiguration (Release or Debug)



# *** Pipeline variables ***
#


name: $(Build.BuildId)

trigger:
  - none

resources:
  - repo: self

variables:
  vmImageName: "ubuntu-latest" # Agent VM image name
  imageName: fiscanner-hello # Your image name
  dockerfile: Dockerfile # Your Dockerfile path
  containerArgs: "--build-arg GREETING=Souch beautifull" # Argument to pass to the container

stages:
  - stage: BuildAndPush
    displayName: Build and Push Docker Image
    jobs:
      - job: DEV
        displayName: Build Docker Image
        condition: and(succeeded(), eq(variables['Build.SourceBranch'], 'refs/heads/develop'), eq(variables['envName'], 'dev'))
        pool:
          vmImage: $(vmImageName)
        steps:
          - task: Docker@2
            displayName: Build
            inputs:
              command: build
              repository: $(imageName)
              tags: "$(Build.BuildId),latest" # Use build number as tag
              dockerfile: $(dockerfile)
              buildArgs: containerArgs # Pass the the build argument
              containerRegistry: "AcrConnection2025"

          - task: Docker@2
            displayName: Push
            inputs:
              command: push
              repository: $(imageName)
              tags: "$(Build.BuildId),latest" # Use build number as tag
              containerRegistry: "AcrConnection2025"
```

## Conclusion
Enjoy your new project on Azure DevOps!
