const path = require('path');
const {Pool} = require('threads')

const threadPool = function(config={}) {
  const {
    workerPath,
    threadsToSpawn,
  } = config;

  const pool = new Pool(threadsToSpawn);

  pool.run(workerPath);

  return pool;
}

module.exports = threadPool
