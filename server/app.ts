import { ApolloServer } from "@apollo/server";
import { handlers, startServerAndCreateLambdaHandler } from "@as-integrations/aws-lambda";
import Movie from "./models/movie";
import { readFileSync } from "fs";

const typeDefs = readFileSync('./schema.graphql', { encoding: 'utf-8' })

const resolvers = {
  Query: {
    trending: () =>  Movie.trending()
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
