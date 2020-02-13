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

const findGenres = (parent) => {
  const { genre_ids, genres } = parent
  if (genres) {
      return genres.map(genre => Genre.findById(genre.id))
  }
  return genre_ids.map(genreId => Genre.findById(genreId))

}

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
