import { ApolloServer } from 'apollo-server-lambda'
import MovieModel from './models/movie'
import GenreModel from './models/genre'
import { readFileSync } from 'fs'
import type {
  Genre,
  Movie,
  QueryGenreArgs,
  QueryMovieArgs,
  QuerySearchArgs,
  Scalars,
} from './types'

const typeDefs = readFileSync('./schema/schema.graphql', { encoding: 'utf-8' })

const resolvers = {
  Movie: {
    poster_path: (parent: Movie) => {
      return `https://image.tmdb.org/t/p/w500${parent.poster_path}`
    },
    trailer: (parent: Movie) => MovieModel.getTrailerVideo(parent.id),
    cast: (parent: Movie) => MovieModel.getCast(parent.id),
    genre_ids: (parent: Movie) =>
      parent.genre_ids.map((genre) => GenreModel.findById(Number(genre), 1)),
  },
  Genre: {
    page: (parent: Genre) =>
      MovieModel.findByGenreIdResponse(+parent.id, parent.page).then(
        (response) => response.page
      ),
    total_pages: (parent: Genre) =>
      MovieModel.findByGenreIdResponse(+parent.id, parent.page).then(
        (response: { total_pages: Scalars['Int'] }) => response.total_pages
      ),
    movies: (parent: Genre) =>
      MovieModel.findByGenreIdResponse(+parent.id, parent.page).then(
        (response) => response.results
      ),
  },
  Query: {
    trending: () => MovieModel.trending(),
    movie: (_: never, args: QueryMovieArgs) => MovieModel.findById(+args.id),
    genres: () => GenreModel.findAll(),
    genre: (_: never, args: QueryGenreArgs) =>
      GenreModel.findById(+args.id, args.page),
    search: (_: never, args: QuerySearchArgs) =>
      MovieModel.search(args.query, args.page).then((response) => response),
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

// This final export is important!
export const graphqlHandler = server.createHandler({
  expressGetMiddlewareOptions: {
    cors: {
      origin: '*',
      credentials: true,
    },
  },
})
