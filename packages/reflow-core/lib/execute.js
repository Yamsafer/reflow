import threadPool from './thread-pool'
import path from 'path'

const executeMatrix = function(matrix, config) {
  const {
    mocha: mochaConfig,
    numberOfThreads,
  } = config;

  const pool = threadPool({
    workerPath: path.join(__dirname, './worker.js'),
    threadsToSpawn: numberOfThreads,
  });

  const sendToPool = tree => pool.send({tree, mochaConfig})
  matrix.forEach(sendToPool);
  let failures = 0;

  pool
    .on('done', function(job, jobFailures) {
      failures += jobFailures;
    })
    .on('error', function(job, error) {
      throw new Error('Job errored:', error)
    })
    .on('finished', function() {
      console.log('Everything done, shutting down the thread pool.');
      console.log(`${failures} total errors.`);
      pool.killAll();
      process.exit(failures)
    });

  return pool
}

export default executeMatrix
