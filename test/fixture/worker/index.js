const mockDep = require('./mock-require.js');

function minmax(params, done) {
  done({
    params,
    mockDep,
  });
}

module.exports = minmax