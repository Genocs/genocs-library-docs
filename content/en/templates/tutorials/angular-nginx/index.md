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


# Setup Docker

## Create Dockerfile

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