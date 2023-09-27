import { ApolloServer } from '@apollo/server'
import {
  handlers,
  startServerAndCreateLambdaHandler,
} from '@as-integrations/aws-lambda'
import MovieModel from './models/movie'
import GenreModel from './models/genre'
import { readFileSync } from 'fs'
import type { Genre, Movie, QueryMovieArgs, Scalars } from './types'

const typeDefs = readFileSync('./schema/schema.graphql', { encoding: 'utf-8' })

const resolvers = {
  Movie: {
    poster_path: (parent: Movie) => {
      return `https://image.tmdb.org/t/p/w500${parent.poster_path}`
    },
    trailer: (parent: Movie) => MovieModel.getTrailerVideo(parent.id),
    cast: (parent: Movie) => MovieModel.getCast(parent.id),
    genre_ids: (parent: Movie): Genre[] =>
      parent.genre_ids.map((genre) => GenreModel.findById(genre, 1)),
  },
  Genre: {
    page: (parent: Genre) =>
      MovieModel.findByGenreIdResponse(parent.id, parent.page).then(
        (response: { page: Scalars['Int'] }) => response.page
      ),
    total_pages: (parent: Genre) =>
      MovieModel.findByGenreIdResponse(parent.id, parent.page).then(
        (response: { total_pages: Scalars['Int'] }) => response.total_pages
      ),
  },
  Query: {
    trending: (): Movie[] => MovieModel.trending(),
    movie: (_: never, args: QueryMovieArgs) => MovieModel.findById(args.id),
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

// This final export is important!

export const graphqlHandler = startServerAndCreateLambdaHandler(
  server,
  handlers.createAPIGatewayProxyEventV2RequestHandler()
)
