import { ApolloServer } from "@apollo/server";
import { handlers, startServerAndCreateLambdaHandler } from "@as-integrations/aws-lambda";
import MovieModel from "./models/movie";
import { readFileSync } from "fs";
import type { Movie } from "./types";

const typeDefs = readFileSync('./schema.graphql', { encoding: 'utf-8' })

const resolvers = {
  Query: {
    trending: (): Movie[] =>  MovieModel.trending()
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// This final export is important!

export const graphqlHandler = startServerAndCreateLambdaHandler(
  server,
  handlers.createAPIGatewayProxyEventV2RequestHandler(),
);
