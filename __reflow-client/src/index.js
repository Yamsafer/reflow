"use strict";

const wd = require("wd");

const chooseClient = (capability) => {
  if(capability.browserName) return require('./browser');
  if(/ios|android/i.test(capability.platform)) return require('./native');
}
module.exports = function({connection, capability, customActions}) {
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

  const client = chooseClient(capability)(driver)

  return client.init({ capability, customActions }).then(_ => client);
}
