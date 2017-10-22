import MochaReflow from './mocha-reflow';
// import decache from 'decache';
import threadPool from './thread-pool'
import path from 'path'
const workerPath = path.join(__dirname, './worker.js');

const executeMatrix = function(matrix, config) {
  const {
    name,
    before,
    after,
    beforeEach,
    afterEach,
  } = config;

  const totalForks = matrix.length;
  const normalizedMatrix = matrix.map((tree, i) => ({
    name: `${name}: fork #${i+1}/${totalForks}`,
    type: "tree",
    suites: tree,
    before: before && "" + before,
  }))

  const pool = threadPool({
    workerPath,
  });

  console.log(`${name}: (${totalForks} total flows)`)
  normalizedMatrix.forEach(pool.send.bind(pool));

  pool
    .on('done', function(job, message) {
      console.log('Job done:', message);
    })
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
