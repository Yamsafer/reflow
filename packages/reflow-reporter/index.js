const mocha = require('mocha');
const utils = mocha.utils;

const defaults = require('lodash.defaults');
const getStacktrace = require('./util/get-stacktrace');
const getErrorMessage = require('./util/get-error-message');

const http = require('http');
const https = require('https');


const defaultConfig = {
  port: 3000,
  hostname: 'localhost',
  path: '/graphql',
  protocol: 'http',
  // flowDetails: {}, // TODO: move inside after finalinzing the interface
  // jobDetails: {},
};

const ReflowReporter = function(runner, options = {}) {
  const reporterOptions = options.reporterOptions || {};
  const {
    flowDetails, // TODO: move inside after finalinzing the interface
    jobDetails,
    port,
    protocol,
    hostname,
    path,
    headers,
  } = defaults(reporterOptions, defaultConfig);

  const tcpModule = protocol === 'https' ? https : http;

  const keepAliveAgent = new tcpModule.Agent({ keepAlive: true });

  mocha.reporters.Base.call(this, runner);
  const stats = this.stats;

  let results = [];
  let startTime;
  let level = 1;
  let numberOfSuites;

  function report (type, data) {
    switch(type) {
      case "case":
        results[results.length - 1].tests.push(data);
        break;
      case "suite":
        results.push(data);
        break;
    }
  }
  function sendRequest(data) {
    process.stdout.write(`\nSending request to: ${hostname}:${port}${path}`);
    const postData = JSON.stringify(data, 2, 2);
    const reqOptions = {
      agent: keepAliveAgent,
      method: 'POST',
      port,
      hostname,
      path,
      protocol: `${protocol}:`,
      headers: Object.assign({
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData),
      }, headers),
    };
    const req = tcpModule.request(reqOptions);

    req.on('error', (e) => {
      console.error(e);
    });

    req.write(postData);
    req.end();
    process.stdout.write('\nRequest sent.\n');
  }

  function submitReport() {
    try {

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

      const postData = {
        operationName: "insertCombination",
        query: "mutation insertCombination($combination: CombinationInput!) {\n  insertCombination(input: $combination) {\n    id\n  }\n}\n",
        variables: {
          combination: report,
        },
      };

      sendRequest(postData);
      results = [];
    } catch(err) {
      console.log('err::', err)
    }

  }

  runner.on('start', function() {
    startTime = Date.parse(new Date());
    numberOfSuites = runner.grepTotal(runner.suite);
  });

  runner.on('suite', function (suite) {
    level = level + 1;
    report('suite', {
      title: utils.escape(suite.title),
      tests: [],
      level,
    });
  });

  runner.on('suite end', function () {
    level = level - 1;
  });


  let metadataContent = [];
  global.trackRequest = function(request) {
    const postData = {
      operationName: "trackRequest",
      query: "mutation trackRequest($request: RequestEventInput!) {\n  track(input: $request) {\n    name\n  }\n}\n",
      variables: { request },
    };

    sendRequest(postData)
  }
  global.metadata = function(message, meta) {
    metadataContent.push({
      message: JSON.stringify(message),
      meta: JSON.stringify(meta),
    });
  }

  // runner.on('hook end', function() {
  //   console.log(metadataContent);
  // });

  runner.on('pass', function (test) {
    report('case', {
      title: utils.escape(test.title),
      code: utils.escape(utils.clean(test.body)),
      speed: test.speed,
      metadata: metadataContent.length? metadataContent : undefined,
      duration: test.duration,
      result: "SUCCESS"
    });

    metadataContent = [];
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
