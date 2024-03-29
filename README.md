## jetflix

[![Netlify Status](https://api.netlify.com/api/v1/badges/2930c7d4-db14-464e-9e5e-80dbe6d056cd/deploy-status)](https://app.netlify.com/sites/jt-jetflix/deploys)

Jetflix web application that consumes movies from The Movie Database (TMDb) through a GraphQL server. It allows authenticated users to search, bookmark and save movies as favorites. Frontend deployed usign the Netlify platform CLI (it's never been easier) and Backend deployed and hosted on Heroku.

# Live Preview!
- Back-End API: https://jt-jetflix-backend.herokuapp.com/graphql VISIT FIRST, PLEASE!!
- Front-End (SPA): https://jt-jetflix.netlify.app/

### Tech
Jetflix uses a number of open source projects to work properly:

- [NuxtJS](https://nuxtjs.org) - The Progressive Vue.js Framework.
- [GraphQL](https://graphql.org) - A query language for your API.
- [TailwindCSS](https://tailwindcss.com/) - A utility-first CSS framework for rapidly building custom designs.
- [Firebase](https://firebase.google.com/) - A comprehensive app development platform.
- [Netlify](https://www.netlify.com/) - All-in-one platform for automating modern web projects.
- [Express.js](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js.

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

ISC

**Free Software, Hell Yeah!**
