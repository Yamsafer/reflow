import path from 'path';
import {Pool} from 'threads'

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