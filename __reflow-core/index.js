'use strict';
if(process.env.REFLOW_DEVELOPMENT) {
  require('babel-register')();
  module.exports = require(`./lib/reflow`);
} else {
  const targetFolder = "distribution";
  module.exports = require(`./distribution/reflow`);
}

