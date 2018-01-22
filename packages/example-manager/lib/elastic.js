const elasticsearch = require('elasticsearch');

class Elastic {
  constructor(config) {
    this.client = new elasticsearch.Client({
      host: [{
        host: config.elastic.host,
        auth: config.elastic.auth,
        protocol: config.elastic.protocol,
        port: config.elastic.port,
      }],
      log: config.elastic.log,
    });
  }
  setup() {
    const circuit = require('reflow-circuit');

    return circuit.setup({
      client: this.client,
    });
  }
  ping() {
    this.client.ping({}, function (error) {
      if (error) {
        console.trace('elasticsearch cluster is down!');
      } else {
        console.log('All is well');
      }
    });
  }
}

module.exports = Elastic;
