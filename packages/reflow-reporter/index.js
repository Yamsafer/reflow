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
  // flowDetails: {},
  // jobDetails: {},
};

const ReflowReporter = function(runner, options = {}) {
  const reporterOptions = options.reporterOptions || {};
  const {
    combinationID,
    flowDetails,
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
  function sendRequest(type, data) {
    process.stdout.write(`\nSending request (${type}) to: ${hostname}:${port}${path}`);
    const postData = JSON.stringify(data);
    const contentLength = Buffer.byteLength(postData);
    const reqOptions = {
      agent: keepAliveAgent,
      method: 'POST',
      port,
      hostname,
      path,
      protocol: `${protocol}:`,
      headers: Object.assign({
        'Content-Type': 'application/json',
        'Content-Length': contentLength,
      }, headers),
    };
    const req = tcpModule.request(reqOptions, (res) => {
      console.log(`STATUS: ${res.statusCode}`);
      console.log(`Content length: ${contentLength}`);

      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
      });
      res.on('end', () => {
        console.log('No more data in response.');
      });
    });

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
        id: combinationID,
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
      console.log('\nreport ::::', JSON.stringify(report, 2, 2))
      const postData = {
        operationName: "insertCombination",
        query: `
        mutation insertCombination($combination: CombinationInput!) {
          insertCombination(input: $combination) {
            edges {
              node {
                id
              }
            }
          }
        }`,
        variables: {
          combination: report,
        },
      };

      sendRequest('combination', postData);
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
