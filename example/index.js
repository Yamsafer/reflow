const reflow = require('../src');
const path = require('path');
const suitePath = path.join(__dirname, './suites/suite.js');

reflow.registerSuitePath('Basic Suite', suitePath);

reflow('', function() {
  return {
    suites: [
      reflow.getSuite('Basic Suite'),
    ]
  }
})