import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLFloat,
  GraphQLID,
  GraphQLSchema,
} from 'graphql'

import MovieModel from '../models/movie'
import GenreModel from '../models/genre'
import { Genre, Movie } from '../types'

const findGenres = (parent: Movie) => {
  const { genre_ids, genres } = parent
  if (genres) {
    return genres.map((genre) => GenreModel.findById(Number(genre?.id)))
  }
  return genre_ids.map((genreId) => GenreModel.findById(+genreId))
}

const runtimeConvert = (runtime: number) => {
  const hours = runtime / 60
  const rHours = Math.floor(hours)
  const minutes = (hours - rHours) * 60
  const rMinutes = Math.floor(minutes)
  return `${rHours}:${rMinutes < 10 ? `0${rMinutes}` : rMinutes}`
}

const MovieType: GraphQLObjectType = new GraphQLObjectType({
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
      },
    },
    tagline: { type: GraphQLString },
    vote_average: { type: GraphQLFloat },
    release_date: { type: GraphQLString },
    runtime: {
      type: GraphQLString,
      resolve: (parent) => {
        return parent.runtime ? runtimeConvert(parent.runtime) : ''
      },
    },
    trailer: {
      type: GraphQLString,
      resolve: (parent) => {
        return MovieModel.getTrailerVideo(parent.id)
      },
    },
    cast: {
      type: new GraphQLList(PersonType),
      resolve: (parent) => {
        return MovieModel.getCast(parent.id)
      },
    },
    homepage: { type: GraphQLString },
    original_language: { type: GraphQLString },
    genre_ids: {
      type: new GraphQLList(GenreType),
      resolve: (parent) => {
        return findGenres(parent)
      },
    },
    genres: {
      type: new GraphQLList(GenreType),
      resolve: (parent) => {
        return findGenres(parent)
      },
    },
  }),
})

const GenreType = new GraphQLObjectType({
  name: 'Genre',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    page: {
      type: GraphQLInt,
      resolve: (parent) => {
        return MovieModel.findByGenreIdResponse(
          Number(parent.id),
          parent.page
        ).then((response) => response.page)
      },
    },
    total_pages: {
      type: GraphQLInt,
      resolve: (parent: Genre) => {
        return MovieModel.findByGenreIdResponse(
          Number(parent.id),
          parent.page
        ).then((response) => response.total_pages)
      },
    },
    movies: {
      type: new GraphQLList(MovieType),
      resolve: (parent) => {
        return MovieModel.findByGenreIdResponse(+parent.id, parent.page).then(
          (response) => response.results
        )
      },
    },
  }),
})

const PersonType = new GraphQLObjectType({
  name: 'Person',
  fields: () => ({
    id: { type: GraphQLID },
    cast_id: { type: GraphQLID },
    character: { type: GraphQLString },
    name: { type: GraphQLString },
    profile_path: { type: GraphQLString },
  }),
})

const SearchType = new GraphQLObjectType({
  name: 'Search',
  fields: () => ({
    results: {
      type: new GraphQLList(MovieType),
      args: {
        query: { type: GraphQLString },
        page: { type: GraphQLInt },
      },
      resolve: (parent) => {
        return parent.results
      },
    },
    page: {
      type: GraphQLInt,
      resolve: (parent) => {
        return parent.page
      },
    },
    total_pages: {
      type: GraphQLInt,
      resolve: (parent) => {
        return parent.total_pages
      },
    },
  }),
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    trending: {
      type: new GraphQLList(MovieType),
      resolve() {
        return MovieModel.trending()
      },
    },
    movie: {
      type: MovieType,
      args: {
        id: { type: GraphQLID },
      },
      resolve: (_, args) => {
        return MovieModel.findById(args.id)
      },
    },
    genres: {
      type: new GraphQLList(GenreType),
      resolve: () => {
        return GenreModel.findAll()
      },
    },
    genre: {
      type: GenreType,
      args: {
        id: { type: GraphQLID },
        page: { type: GraphQLInt },
      },
      resolve: (parent, args) => {
        return GenreModel.findById(args.id, args.page)
      },
    },
    search: {
      type: SearchType,
      args: {
        query: { type: GraphQLString },
        page: { type: GraphQLInt },
      },
      resolve: (_, args) => {
        return MovieModel.search(args.query, args.page).then(
          (response) => response
        )
      },
    },
  },
})

module.exports = new GraphQLSchema({
  query: RootQuery,
})
