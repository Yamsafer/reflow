const _ = require('lodash');
const graphqlRoute = require('./routes/graphql');

const defaultConfig = {
};


const lift = function(userConfig) {
  const config = _.defaults(userConfig, defaultConfig);
  config.app.use(graphqlRoute(config.elastic));
}

module.exports = lift
