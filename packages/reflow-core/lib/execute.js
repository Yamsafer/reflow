const path = require('path')
const Duration = require('duration');
const threadPool = require('./thread-pool')
const {analyzeCombination} = require('./analyze')

let failures = 0;
let errored = false;
let done = false;

const executeMatrix = function(matrix, config) {
  const {
    mocha: mochaConfig,
    jobDetails,
    flowDetails,
    connection,
    capability,
    customActions,
  } = config;
  const startTime = jobDetails.startTime;
  const numberOfThreads = jobDetails.numberOfThreads;
  const numberOfFlows = jobDetails.numberOfFlows;

  const pool = threadPool({
    workerPath: path.join(__dirname, './worker.js'),
    threadsToSpawn: numberOfThreads,
  });

  const sendToPool = combination => pool.send({
    DAG: analyzeCombination(combination),
    combination,
    mochaConfig,
    jobDetails,
    flowDetails,
    connection,
    capability,
    customActions,
  });

  matrix.forEach(sendToPool);

  pool
    .on('done', function(job, jobFailures) {
      failures += jobFailures;
    })
    .on('error', function(job, error) {
      errored = true;
      console.log('Job errored:', error);
      throw error;
    })
    .on('finished', function() {
      console.log('Everything done, shutting down the thread pool.');
      const duration = new Duration(startTime, new Date())
      console.log(`Finished All ${numberOfFlows} Flows in ${duration.toString(1, 1)}`);
      console.log(`${failures} total errors.`);
      pool.killAll();
      done = true;
    });

  process.on('exit', function() {
    if(!done) console.log('Exited before done')

    process.exit(+!!(errored || failures));
  })

  return pool
}

module.exports = executeMatrix
