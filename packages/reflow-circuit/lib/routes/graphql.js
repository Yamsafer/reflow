const express = require('express');
const graphqlHTTP = require('express-graphql');
const DataLoader = require('dataloader');
const elasticModel = require('../model/elastic');
const bodyParser = require('body-parser');
const schema = require('../schema');

const graphqlMiddleware = function(client) {
  const router = express.Router();
  const elastic = elasticModel(client);

  router.use('/graphql', bodyParser.json(), (req, res) => {
    const loaders = {
      flowsByIds: new DataLoader(elastic.getFlowsByIds),
    };

    graphqlHTTP({
      schema,
      graphiql: true,
      context: { loaders, elastic }
    })(req, res);

  });

  return router;
}


module.exports = graphqlMiddleware;
