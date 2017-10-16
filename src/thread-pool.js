import path from 'path';
const Pool = require('threads').Pool;

const createThreadPool = function(config={}) {
  const {
    workerPath,
    threadsToSpawn,
  } = config;

  const pool = new Pool(threadsToSpawn);
   
  pool.run(workerPath);
  
  return pool;
}

export default createThreadPool