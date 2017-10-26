import MochaReflow from './mocha-reflow';
import threadPool from './thread-pool'
import path from 'path'

const executeMatrix = function(matrix, config) {
  const {
    mocha: mochaConfig,
  } = config;

  const pool = threadPool({
    workerPath: path.join(__dirname, './worker.js'),
  });

  const sendToPool = tree => pool.send({tree, mochaConfig})
  matrix.forEach(sendToPool);

  pool
    .on('error', function(job, error) {
      console.error('Job errored:', error);
    })
    .on('finished', function() {
      console.log('Everything done, shutting down the thread pool.');
      pool.killAll();
    });

  return pool
}

export default executeMatrix
