const graphql = require('graphql')
const Movie = require('../models/movie')
const Genre = require('../models/genre')
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLSchema,
  GraphQLString,
  GraphQLID,
  GraphQLInt
} = graphql

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    id: { type: GraphQLID },
    original_title: { type: GraphQLString },
    overview: { type: GraphQLString },
    poster_path: { type: GraphQLString },
    tagline: { type: GraphQLString },
    release_date: { type: GraphQLString },
    runtime: { type: GraphQLInt },
    homepage: { type: GraphQLString },
    original_language: { type: GraphQLString },
    genres: {
      type: new GraphQLList(GenreType),
      resolve: (parent, args) => {
        const genres = parent.genres.map((genre) => Genre.findById(genre.id))
        return genres
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
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})
