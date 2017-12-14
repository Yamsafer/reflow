const mocha = require('mocha');
const utils = mocha.utils;

const defaults = require('lodash.defaults');
const getStacktrace = require('./util/get-stacktrace');
const getErrorMessage = require('./util/get-error-message');

const http = require('http');
const https = require('https');


const defaultConfig = {
  batch: true,
  meta: {},
  port: 3000,
  hostname: 'localhost',
  path: '/graphql',
  // flowDetails: {}, // TODO: move inside after finalinzing the interface
  // jobDetails: {},
};

const ReflowReporter = function(runner, options ={}) {

  const reporterOptions = options.reporterOptions || {};
  const {
    batch,
    flowDetails, // TODO: move inside after finalinzing the interface
    jobDetails,
    port,
    protocol,
    hostname,
    path,
    headers,
  } = defaults(reporterOptions, defaultConfig);

  const keepAliveAgent = new https.Agent({ keepAlive: true });

  mocha.reporters.Base.call(this, runner);
  const stats = this.stats;

  let results = [];
  let CURRENT_CURSOR;
  let startTime;
  let numberOfSuites;

  function report (type, data) {
    if(type === 'case') {
      results[CURRENT_CURSOR].tests.push(data)
    } else if(type === 'suite') {
      results.push(data)
      CURRENT_CURSOR = results.length - 1;
    }
    if(!batch) {
      submitReport();
    }
  }

  function submitReport() {
    process.stdout.write('\nGenerating Report ... ');
    const report = {
      suites: results,
      pending: stats.pending,
      passes: stats.passes,
      failures: stats.failures,
      skipped: stats.tests - stats.failures - stats.passes,
      endTime: Date.parse(new Date()),
      duration: (stats.duration / 1000) || 0,
      result: stats.failures? 'FAILURE' : 'SUCCESS',
      numberOfSuites,
      startTime: startTime,
      flowDetails,
      jobDetails: Object.assign({}, jobDetails, {
        startTime: Date.parse(jobDetails.startTime),
      }),
    }
    process.stdout.write('Done');

    const postData = JSON.stringify({
      operationName: "insertCombination",
      query: "mutation insertCombination($combination: CombinationInput!) {\n  insertCombination(input: $combination) {\n    id\n  }\n}\n",
      variables: {
        combination: report,
      },
    });
    process.stdout.write(`\nSending request to: ${hostname}:${port}${path}`);
    // const requestLayer = https;
    const reqOptions = {
      agent: keepAliveAgent,
      method: 'POST',
      port,
      hostname,
      path,
      // protocol,
      headers: Object.assign({
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
      }, headers),
    };
    try {

      const req = https.request(reqOptions);

      req.on('error', (e) => {
        console.error(e);
      });

      req.write(postData);
      req.end();

      process.stdout.write('\nReport sent:\n');
      process.stdout.write(JSON.stringify(report, 2, 2));
      process.stdout.write('\n');
      results = [];
    } catch(err) {
      console.log('got err!!@#!@#!', err)
    }
  }

  runner.on('start', function() {
    startTime = Date.parse(new Date());
    numberOfSuites = runner.grepTotal(runner.suite);
  });

  runner.on('suite', function (suite) {
    report('suite', {
      title: utils.escape(suite.title),
      tests: []
    });
  });

  runner.on('pass', function (test) {
    report('case', {
      title: utils.escape(test.title),
      code: utils.escape(utils.clean(test.body)),
      speed: test.speed,
      duration: test.duration,
      result: "SUCCESS"
    })
  });


  runner.on('pending', function (test) {
    report('case', {
      result: 'PENDING',
      title: utils.escape(test.title),
    })
  });

  runner.on('fail', function (test) {
    const err = test.err;
    report('case', {
      result: 'FAILURE',
      title: utils.escape(test.title),
      code: utils.escape(utils.clean(test.body)),
      speed: test.speed,
      duration: test.duration,
      err: {
        stacktrace: utils.escape(getStacktrace(err)),
        message: utils.escape(getErrorMessage(err)),
        htmlMessage: err.htmlMessage,
      }
    })
  });

  runner.on('end', function() {
    submitReport();
  })
}

module.exports = ReflowReporter;
