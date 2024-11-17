---
title: "CORS"
description: "Understanding CORS in Genocs's Web API."
lead: "Understanding CORS in Genocs's Web API."
date: 2021-08-24T11:40:05+05:30
lastmod: 2024-08-21 14:50:50+02:00
draft: false
images: []
menu:
  templates:
    identifier: "cors"
    name: "CORS"
    parent: "multitenancy-dotnet-template"
weight: 4
toc: true
---

CORS is an mechanism that allows a server to indicate any origins (domain, scheme, or port) other than its own.

Genocs Web API has support for providing to several clients, all of the configurations related this feature can be found under `src/Host/Configurations/cors.json`.

We present two scenarios that demonstrate how Cross-Origin requests by clients can be served:

``` json
{
  "CorsSettings": {
    "Angular": "http://localhost:4200",
    "Blazor": "https://localhost:5002;https://www.mydomain.my",
    "React": "http://localhost:3000"
  }
}
```


