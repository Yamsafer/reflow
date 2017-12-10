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
const schema = require('./schema');

const {
  makeExecutableSchema,
  addMockFunctionsToSchema,
} = require('graphql-tools');


// const resolvers = require('../resolvers');
const createLoaders = (elastic) => {
  return {
    flowsByIds: new DataLoader(elastic.getFlowsByIds),
    flowsByJobsIds: new DataLoader(elastic.getFlowsByJobsIds),
  }
}

const defaultConfig = {};

const circuitMiddleware = function(userConfig) {
  const config = _.defaults(userConfig, defaultConfig);

  const router = express.Router();
  const elastic = elasticModel(config.elastic);

  const schema = makeExecutableSchema({
    typeDefs: [
      loadSchema('schema/schema.graphql'),
    ],
    resolvers: _.merge(
      require('./schema/resolvers')
    ),
  });

  addMockFunctionsToSchema({
    schema,
    preserveResolvers: true,
  });

  router.use('/graphql', bodyParser.json(), (req, res) => {
    graphqlExpress({
      schema,
      context: {
        elastic,
        loaders: createLoaders(elastic),
      },
    })(req, res);
  });

  router.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql'
  }));

  return router;
}


module.exports = circuitMiddleware;
