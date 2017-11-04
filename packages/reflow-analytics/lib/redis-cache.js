import express from 'express'
import redis from 'redis';
import _ from 'lodash';

const router = express.Router();

const defaultConfig = {
  type: 'redis',
  prefix: 'reflow|analytics',
  host: 'localhost',
  port: 6379,
};

const redisCache = function(userConfig) {
  const config = _.defaults(userConfig, defaultConfig);
  return function() {
    const client = redis.createClient({
      host: config.host,
      port: config.port,
    });

    const ITPExpressRedisCache = require('itp-express-redis-cache')({
      host: config.host,
      port: config.port,
      authPass: null,
      enabled: true,
    });


    router.get('/cache/clear', function(req, res, next) {
      client.keys(`${config.prefix}:*`, (err, keys) => {
        if (err) return res.status(400).send(err.toString());
        if(!keys.length) return res.json(0)
        client.del(keys, (err, result) => {
          if (err) return res.status(400).send(err.toString());
          res.json(result);
        });
      });
    })

    router.use(ITPExpressRedisCache.route({
      key: req => `${config.prefix}:${req.originalUrl}`,
      expire: 60 * 60,
    }))
  }
}

export default 