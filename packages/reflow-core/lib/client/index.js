"use strict";

const wd = require("wd");

const BaseClient = require('./base');
// const BrowserClient = require('./browser');
const NativeClient = require('./native');

module.exports = function(appiumCon, cap) {
  if(!appiumCon) return Promise.resolve({});
  const driver = wd.promiseChainRemote(appiumCon);

  const client = new NativeClient(driver);
  return client.init({ cap }).then(_ => client);
}
