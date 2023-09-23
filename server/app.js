const { startServerAndCreateLambdaHandler, handlers } = require('@as-integrations/aws-lambda') ;
const { ApolloServer } = require('@apollo/server')
const Movie = require('./models/movie')
const{ readFileSync } = require('fs')
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

exports.graphqlHandler = startServerAndCreateLambdaHandler(
  server,
  handlers.createAPIGatewayProxyEventRequestHandler(),
);
