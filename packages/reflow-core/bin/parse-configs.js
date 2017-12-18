'use strict';

const yaml = require('js-yaml');
const fs = require('fs');
const path = require('path');

const getConfigs = filePath => {
  if(!filePath) return;
  const content = fs.readFileSync(filePath, 'utf8');
  if(path.extname(filePath) === '.yml') {
    return yaml.safeLoad(content);
  }
  return JSON.parse(content);
}

module.exports = getConfigs
