## jetflix

[![Build Status](https://travis-ci.com/josewhitetower/jetflix.svg?branch=master)](https://travis-ci.com/josewhitetower/jetflix)
[![Netlify Status](https://api.netlify.com/api/v1/badges/2930c7d4-db14-464e-9e5e-80dbe6d056cd/deploy-status)](https://app.netlify.com/sites/jt-jetflix/deploys)

Jetflix web application that consumes movies from The Movie Database (TMDb) through a GraphQL server. It allows users to search, bookmark and save movies as favorites. Deployed usign the Netlify platform CLI (it's never been easier).

# Live Preview!

- Front-End: https://jt-jetflix.netlify.com/
- Back-End API: https://jt-jetflix.appspot.com/graphql

### Tech

Spotify-Tidal URL Converter uses a number of open source projects to work properly:

- [NuxtJS](https://nuxtjs.org) - The Progressive Vue.js Framework.
- [GraphQL](https://graphql.org) - A query language for your API.
- [TailwindCSS](https://tailwindcss.com/) - A utility-first CSS framework for rapidly building custom designs.
- [Netlify](https://www.netlify.com/) - All-in-one platform for automating modern web projects.
- [Express.js](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js.
- [Google Cloud Platform](https://cloud.google.com/) - Cloud Application Platform.

### Installation

Create a .env file under /server folder and complete the following variable

```
    API_KEY=''
    API_URL=https://api.themoviedb.org/3/
    API_TOKEN=''
```
Install the dependencies and devDependencies and start the server.

Frontend:

```sh
$ cd client
$ npm install -d
$ npm run serve
```

Backend:

```sh
$ cd server
$ npm install -d
$ npm run start
```

## License

MIT

**Free Software, Hell Yeah!**