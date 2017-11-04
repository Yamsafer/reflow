import express from 'express'
import _ from 'lodash';

const defaultConfig = {
  cache: false,
  routes: [],
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

  if(config.cache) {
    const cacheFn = require(`./${config.cache.type}-cache`);
    app.use(cacheFn(config.cache));
  }

  config.routes.forEach((middleware) => {
    app.use(...middleware);
  })

  app.listen(config.server.port, function() {
    console.log('reflow|analytics Online.');
  });

  return app;
}

export default lift