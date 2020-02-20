const graphql = require('graphql')
const Movie = require('../models/movie')
const Genre = require('../models/genre')
const {
  GraphQLObjectType,
  GraphQLList,
  GraphQLSchema,
  GraphQLString,
  GraphQLID,
  GraphQLFloat,
  GraphQLInt
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
  return `${rHours}:${rMinutes < 10 ? `0${rMinutes}` : rMinutes}`
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
        if (parent.poster_path) {
          return `https://image.tmdb.org/t/p/w500${parent.poster_path}`
        }
      }
    },
    tagline: { type: GraphQLString },
    vote_average: { type: GraphQLFloat },
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
    page: {
      type: GraphQLInt,
      resolve: (parent) => {
        return Movie.findByGenreIdResponse(parent.id, parent.page).then(
          (response) => response.page
        )
      }
    },
    total_pages: {
      type: GraphQLInt,
      resolve: (parent) => {
        return Movie.findByGenreIdResponse(parent.id, parent.page).then(
          (response) => response.total_pages
        )
      }
    },
    movies: {
      type: new GraphQLList(MovieType),
      resolve: (parent, args) => {
        return Movie.findByGenreIdResponse(parent.id, parent.page).then(
          (response) => response.results
        )
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

const SearchType = new GraphQLObjectType({
  name: 'Search',
  fields: () => ({
    results: {
      type: new GraphQLList(MovieType),
      args: {
        query: { type: GraphQLString },
        page: { type: GraphQLInt }
      },
      resolve: (parent, args) => {
        return parent.results
      }
    },
    page: {
      type: GraphQLInt,
      resolve: (parent, args) => {
        return parent.page
      }
    },
    total_pages: {
      type: GraphQLInt,
      resolve: (parent, args) => {
        return parent.total_pages
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
        id: { type: GraphQLID },
        page: { type: GraphQLInt }
      },
      resolve: (parent, args) => {
        return Genre.findById(args.id, args.page)
      }
    },
    search: {
      type: SearchType,
      args: {
        query: { type: GraphQLString },
        page: { type: GraphQLInt }
      },
      resolve: (parent, args) => {
        return Movie.search(args.query, args.page).then((response) => response)
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
})
