"use strict";

const wd = require("wd");

const BaseClient = require('./base');
// const BrowserClient = require('./browser');
const NativeClient = require('./native');

module.exports = function(connection, capability) {
  if(!connection) return Promise.resolve({});
  // console.log('connection::', connection)
  wd.configureHttp({
    // baseUrl: 'localhost',
    // proxy: 'http://localhost:3000',
    retryDelay: 15,
    retries: 'never',
    timeout: 'default',
  });
  const driver = wd.promiseChainRemote(connection);

  const client = new NativeClient(driver);

  return client.init({ capability }).then(_ => client);
}
