const setupElastic = require('./model/elastic/setup');
module.exports = function(config) {
  return setupElastic(config.elastic);
}
