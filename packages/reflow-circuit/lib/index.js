const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const DataLoader = require('dataloader');
const loadSchema = require('./util/load-graphql');

const {
  graphqlExpress,
  graphiqlExpress,
} = require('graphql-server-express');

const elasticModel = require('./model/elastic');

const {
  makeExecutableSchema,
  // addMockFunctionsToSchema,
} = require('graphql-tools');

// const createLoaders = (elastic) => {
//   return {
//     // flowsByIds: new DataLoader(elastic.getFlowsByIds),
//     combinationsByIds: new DataLoader(elastic.getCombinationsByIds),
//   }
// }

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
        // loaders: createLoaders(elastic),
      },
    })(...args);
  });

  router.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
  }));

  return router;
}

module.exports = circuitMiddleware;
