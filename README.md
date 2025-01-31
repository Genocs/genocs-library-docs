# Genocs Library's Documentation

[![Discord](https://img.shields.io/discord/1106846706512953385?color=%237289da&label=Discord&logo=discord&logoColor=%237289da&style=flat-square)](https://discord.com/invite/fWwArnkV)
[![Twitter](https://img.shields.io/twitter/follow/genocs?color=1DA1F2&label=Twitter&logo=Twitter&style=flat-square)](https://twitter.com/genocs)
[![Netlify Status](https://api.netlify.com/api/v1/badges/6dbb93bc-ad39-4fda-849a-e542abdcfa7c/deploy-status)](https://app.netlify.com/sites/genocs-blog/deploys)

<p align="center">
    <img src="genocs-library-logo.png" alt="icon">
</p>

## How to contribute?

1. Fork this Repository.
2. Navigate to your newly forked Repository -> Settings -> Secrets.
3. Here, Add a new Repository Secret with a name `GT_TOKEN`. As for the value, paste in your GitHub Token (https://github.com/settings/tokens)
4. Now, clone this repository locally.
5. Ensure that you have Node.js and Visual Code installed.
6. At the root of the repository run `npm install`. This installs all the required packages.
7. All the documentations are to be written in markdown format.
8. Refer https://github.com/Genocs/genocs-library-docs/blob/main/content/en/templates/general/getting-started/index.md to get an idea on how to write documentation and include images, code snippets and stuff.
9. To run the application locally, run the command `npm run start` and navigate to localhost:1313
10. Once ready, send a Pull Request.


# How to build and run on Docker

1. Clone the repository
2. Run the following command to build the docker image
    ```bash
    # build the application release version
    npm run build
    
    # build the docker image
    docker build -t genocs/genocs-library-docs .
    
    # tag the image
    docker tag genocs/genocs-library-docs genocs/genocs-library-docs:1.1.4
    docker tag genocs/genocs-library-docs genocs/genocs-library-docs:latest
    
    # login to docker hub
    docker login
    
    # push the image to docker hub
    docker push genocs/genocs-library-docs:1.1.4
    docker push genocs/genocs-library-docs:latest
    ```
3. Run the following command to run the docker image on localhost:1613
    ```bash
    docker run -d -p 1613:80 genocs/genocs-library-docs
    ```
4. Navigate to localhost:1613 to view the documentation


## Acknowledgment

- Original theme [h-enk doks](https://github.com/h-enk/doks)
- Original project [fullstackhero](https://github.com/fullstackhero)
- Awesome mentor [Mukesh Murugan](https://github.com/iammukeshm)