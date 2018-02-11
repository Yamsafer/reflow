const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const loadSchema = require('./util/load-graphql');

const {
  graphqlExpress,
  graphiqlExpress,
} = require('graphql-server-express');

const {
  makeExecutableSchema,
  // addMockFunctionsToSchema,
} = require('graphql-tools');

const defaultConfig = {};

const circuitMiddleware = function({connection}) {
  const router = express.Router();

  const schema = makeExecutableSchema({
    typeDefs: loadSchema('./graphql/schema'),
    resolvers: _.merge(
      require('./graphql/resolvers')
    ),
  });

  // addMockFunctionsToSchema({
  //   schema,
  //   preserveResolvers: true,
  // });

  router.use('/graphql', bodyParser.json(), (...args) => {
    graphqlExpress({
      schema,
      context: {
        connection,
      },
    })(...args);
  });

  router.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
  }));

  return router;
}

module.exports = circuitMiddleware;
