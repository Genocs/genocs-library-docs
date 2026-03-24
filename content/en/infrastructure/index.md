---
title: "Infrastructure"
description: "How to set up your infrastructure."
lead: "How to set up your infrastructure."
date: 2023-05-13T15:40:19+02:00
lastmod: 2026-03-24T20:59:42Z
draft: false
images: []
---

Modern application requires to be hosted on an infrastructure to be production ready. It requires to take in consideration many topics.

In this walkthrough we will setup the steps required to have an infrastructure up and running on Azure.

This proposal is thought as to be used on Azure, even though most of the options could be reused for any cloud provider like Google Cloud or AWS.

<img src="/images/gnx-architecture-network.svg" alt="Architecture Network">

## Prerequisites

- **Azure Subscription** to create Kubernetes cluster
- **kubectl** logged into Kubernetes cluster
- **PowerShell**
- **Postman**
- **Helm**
- **DockerHub account** (optional)

## Introduction

The setup is spitted into different steps:

- Bare components
- Security
- Scaling
- Monitoring
- Application

## Setup - Overview

During this step we are going to setup Kubernetes cluster tackling the following components:

- Setup private Docker images repository
- Setup the Kubernetes cluster
- Setup the Vault for secrets
- Secure secrets
- Setup networking
- Setup autoscaler

### Monitoring

The implementation will monitor both infrastructure and application side.

The monitoring will be implemented using different approach. Some are open source, other don't.

Open-source Components uses in this demo:

- [Grafana](https://grafana.com/)
- [Jaeger](https://www.jaegertracing.io/)
- [Prometheus](https://prometheus.io/)

**NOTE:** The open-source components have the enterprise version. It requires to have active subscription if you plan to use them.

### Security and Networking

Security and Networking context will implement all the components that allows to handle:

- routing (forward requests to the services throughout a reverse proxy)
- termination (secure APIs calls by SSL or TLS)
- throttling

Main components are:

- Public IP
- Vnet and Subnet
- Api Gateway Ingress Controller

There are various products out of the box that can be used to implement the solution. All of them have PROS and CONS.

The most used ones are:

- [Azure AGIC](https://learn.microsoft.com/en-us/azure/application-gateway/ingress-controller-install-new)
- [NGNIX](https://www.nginx.com/)
- [Kong](https://konghq.com/)

In this solution the first choice is based on `Kong`.

Authentication and authorization are implemented using `OAuth2`. `Kong` provides plugin that streamline the implementation.

- [OAuth2](https://oauth.net/2/)
- [OpenId](https://openid.net/connect/)

## Autoscaler

There are multiple options for scaling Kubernetes and containers in general.

Here `(KEDA) Kubernetes-based Event Driven Autoscaling` will be used.

RabbitMQ is used as the event source.

If you wish to use Kubernetes cluster apart from AKS, you can skip the `Step 2.1` of provisioning the cluster and [install KEDA](https://github.com/kedacore/keda#setup) on your own Kubernetes cluster.

Similarly, if you do not wish to execute the PowerShell scripts, you can execute the commands which are part of those scripts manually.

{{< partial "code-organization-subsections.html" >}}

{{< partial "section-2-setup-steps.html" >}}

{{< partial "resource-groups-section.html" >}}

## Community

- Discord [@genocs](https://discord.com/invite/fWwArnkV)
- Facebook Page [@genocs](https://facebook.com/Genocs)
- Youtube Channel [@genocs](https://youtube.com/c/genocs)

## Contributors

Submit your PR and join the list!

<a href="https://github.com/Genocs/enterprise-containers/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Genocs/enterprise-containers" />
</a>

## License

This project is licensed with the [MIT license](LICENSE).

## Support :star:

Has this project helped you learn something New? or Helped you at work?
Here are a few ways by which you can support.

- Leave a star! :star:
- Recommend this awesome project to your colleagues. 🥇
- Do consider endorsing me on LinkedIn for ASP.NET Core - [Connect via LinkedIn](https://www.linkedin.com/in/giovanni-emanuele-nocco-b31a5169/) 🦸
- Or, If you want to support this project in the long run, [consider buying me a coffee](https://www.buymeacoffee.com/genocs)! ☕

<br>
<a href="https://www.buymeacoffee.com/genocs"><img width="250" alt="black-button" src="https://user-images.githubusercontent.com/31455818/138557309-27587d91-7b82-4cab-96bb-90f4f4e600f1.png"></a>

## Acknowledgements

A lot of people inspired me and provided unevaluable amount of information:

Here some of them:

- [NileshGule](https://github.com/NileshGule/)
- [DevMentors](https://github.com/devmentors/)

## References

- [Hands-on-Kubernetes-on-Azure-Third-Edition](https://github.com/PacktPublishing/Hands-on-Kubernetes-on-Azure-Third-Edition)
