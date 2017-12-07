const express = require('express');

const DataLoader = require('dataloader');
const elasticModel = require('../model/elastic');
const bodyParser = require('body-parser');
const schema = require('../schema');

const {
  graphqlExpress,
  graphiqlExpress,
} = require('graphql-server-express');


// const resolvers = require('../resolvers');
const createLoaders = (elastic) => {
  return {
    flowsByIds: new DataLoader(elastic.getFlowsByIds),
    flowsByJobsIds: new DataLoader(elastic.getFlowsByJobsIds),
  }
}

const graphqlMiddleware = function(client) {
  const router = express.Router();
  const elastic = elasticModel(client);

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


module.exports = graphqlMiddleware;
