import express from 'express'
import _ from 'lodash';
import bodyParser from 'body-parser';

const defaultConfig = {
  port: 3000,
};
function lift(userConfig) {
  const config = _.defaults(userConfig, defaultConfig);

  const app = express();

  app.use(bodyParser.json());

  app.get('/', function(req, res) {
    res.send('hello')
  });
  app.post('/tree', function(req, res) {
    // console.log(req.body)
    res.send('Success')
  })
  // const server = app.listen(config.port, function() {
  //   // console.log('reflow|analytics Online.');
  // });

  return app;
}

export default lift
