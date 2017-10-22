import path from 'path';
// import {Pool} from 'thread'
const Pool = require('threads').Pool;

const threadPool = function(config={}) {
  const {
    workerPath,
    threadsToSpawn,
  } = config;

  const pool = new Pool(threadsToSpawn);
   
  pool.run(workerPath);
  
  return pool;
}

export default threadPool