const graphql = require('graphql')
const Movie = require('../models/movie')
const Genre = require('../models/genre')
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLSchema,
  GraphQLString,
  GraphQLID,
} = graphql

const findGenres = (parent) => {
  const { genre_ids, genres } = parent
  if (genres) {
    return genres.map((genre) => Genre.findById(genre.id))
  }
  return genre_ids.map((genreId) => Genre.findById(genreId))
}

const runtimeConvert = (runtime) => {
  const hours = runtime / 60
  const rHours = Math.floor(hours)
  const minutes = (hours - rHours) * 60
  const rMinutes = Math.floor(minutes)
  return `${rHours}:${rMinutes}`
}

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    overview: { type: GraphQLString },
    poster_path: {
      type: GraphQLString,
      resolve: (parent) => {
        return `https://image.tmdb.org/t/p/w500${parent.poster_path}`
      }
    },
    tagline: { type: GraphQLString },
    release_date: { type: GraphQLString },
    runtime: {
      type: GraphQLString,
      resolve: (parent) => {
        return parent.runtime ? runtimeConvert(parent.runtime) : ''
      }
    },
    trailer: {
      type: GraphQLString,
      resolve: (parent) => {
        return Movie.getTrailerVideo(parent.id)
      }
    },
    cast: {
      type: new GraphQLList(PersonType),
      resolve: (parent) => {
        return Movie.getCast(parent.id)
      }
    },
    homepage: { type: GraphQLString },
    original_language: { type: GraphQLString },
    genre_ids: {
      type: new GraphQLList(GenreType),
      resolve: (parent, args) => {
        return findGenres(parent)
      }
    },
    genres: {
      type: new GraphQLList(GenreType),
      resolve: (parent, args) => {
        return findGenres(parent)
      }
    }
  })
})

const GenreType = new GraphQLObjectType({
  name: 'Genre',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    movies: {
      type: new GraphQLList(MovieType),
      resolve: (parent, args) => {
        return Movie.findByGenreId(parent.id)
      }
    }
  })
})

const PersonType = new GraphQLObjectType({
  name: 'Person',
  fields: () => ({
    id: { type: GraphQLID },
    cast_id: { type: GraphQLID },
    character: { type: GraphQLString },
    name: { type: GraphQLString },
    profile_path: { type: GraphQLString }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    trending: {
      type: new GraphQLList(MovieType),
      resolve() {
        return Movie.trending()
      }
    },
    movie: {
      type: MovieType,
      args: {
        id: { type: GraphQLID }
      },
      resolve: (parent, args) => {
        return Movie.findById(args.id)
      }
    },
    genres: {
      type: new GraphQLList(GenreType),
      resolve: () => {
        return Genre.findAll()
      }
    },
    genre: {
      type: GenreType,
      args: {
        id: { type: GraphQLID }
      },
      resolve: (parent, args) => {
        return Genre.findById(args.id)
      }
    },
    search: {
      type: new GraphQLList(MovieType),
      args: {
        query: { type: GraphQLString }
      },
      resolve: (parent, args) => {
          console.log(args)
          return Movie.search(args.query)
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})
