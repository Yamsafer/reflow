import express from 'express'
import _ from 'lodash';

const defaultConfig = {
  server: {
    port: 3000,
  },
};

function lift(userConfig) {
  const config = _.defaults(userConfig, defaultConfig);

  const app = express();
  const expressPort = config.server.port;

  app.get('/', function(req, res, next) {
    res.send('hello')
  });
  // const server = app.listen(config.server.port, function() {
  //   // console.log('reflow|analytics Online.');
  // });

  return app;
}

export default lift