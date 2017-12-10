const mocha = require('mocha');
const utils = mocha.utils;

const defaults = require('lodash.defaults');
const getStacktrace = require('./util/get-stacktrace');
const getErrorMessage = require('./util/get-error-message');

const defaultConfig = {
  batch: true,
  meta: {},
};

const ReflowReporter = function(runner, options) {
  const {
    batch,
    flowDetails, // TODO: move inside after finalinzing the interface
    // title
    jobDetails,
    // startTime
    // targetBranch
    // sourceBranch
    // trigger
  } = defaults(options && options.reporterOptions, defaultConfig);

  mocha.reporters.Base.call(this, runner);
  const stats = this.stats;

  let results = [];
  let CURRENT_CURSOR;
  let startTime;
  let totalSuites;

  function report (type, data) {
    if(type === 'case') {
      results[CURRENT_CURSOR].cases.push(data)
    } else if(type === 'suite') {
      results.push(data)
      CURRENT_CURSOR = results.length - 1;
    }
    if(!batch) {
      submitReport();
    }
  }

  function submitReport() {
    const report = {
      suites: results,
      pending: stats.pending,
      passes: stats.passes,
      failures: stats.failures,
      errors: stats.failures,
      skipped: stats.tests - stats.failures - stats.passes,
      endTime: Date.parse(new Date()),
      duration: (stats.duration / 1000) || 0,
      status: 'SUCCESS',
    }
    process.stdout.write(JSON.stringify(report));
    results = [];
  }

  runner.on('start', function() {
    startTime = Date.parse(new Date());
    totalSuites = runner.grepTotal(runner.suite);
  });

  runner.on('suite', function (suite) {
    report('suite', {
      title: utils.escape(suite.title),
      cases: []
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
      status: 'PENDING',
      title: utils.escape(test.title),
    })
  });

  runner.on('fail', function (test) {
    const err = test.err;
    report('case', {
      status: 'FAILURE',
      title: utils.escape(test.title),
      code: utils.escape(utils.clean(test.body)),
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
