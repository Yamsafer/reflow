import {Pool} from 'threads'

interface ThreadPoolConfig {
  workerPath: string,
  threadsToSpawn?: number,
}

export
const threadPool = function(threadPoolConfig: ThreadPoolConfig) {
  const {
    workerPath,
    threadsToSpawn,
  } = threadPoolConfig;

  const pool = new Pool(threadsToSpawn);

  pool.run(workerPath);

  return pool;
}
