import path from 'path'
import Duration from 'duration';
import threadPool from './thread-pool'

const executeMatrix = function(matrix, config) {
  const {
    mocha: mochaConfig,
    jobDetails,
    flowDetails,
  } = config;
  const startTime = jobDetails.startTime;
  const numberOfThreads = jobDetails.numberOfThreads;
  const numberOfFlows = jobDetails.numberOfFlows;

  const pool = threadPool({
    workerPath: path.join(__dirname, './worker.js'),
    threadsToSpawn: numberOfThreads,
  });

  const sendToPool = tree => pool.send({
    tree,
    mochaConfig,
    jobDetails,
    flowDetails,
  });


  matrix.forEach(sendToPool);
  let failures = 0;
  let done = false;

  pool
    .on('done', function(job, jobFailures) {
      failures += jobFailures;
    })
    .on('error', function(job, error) {
      console.log('Job errored:');
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
    process.exit(+!!failures);
  })
  return pool
}

export default executeMatrix
