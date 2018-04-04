const fs = require('fs');
const util = require('util');
const accessAsync = util.promisify(fs.access);

function checkPathsExistence(paths) {
  return Promise.all(
    paths.map(path => accessAsync(path, fs.constants.R_OK))
  )
}

module.exports = checkPathsExistence;
