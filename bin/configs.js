'use strict';

const yaml = require('js-yaml');
const fs = require('fs');

const getConfigs = filePath => {
  try {
    return yaml.safeLoad(fs.readFileSync(filePath, 'utf8'))
  } catch (err) {
    console.error(err)
  }
  return {};
}

module.exports = getConfigs