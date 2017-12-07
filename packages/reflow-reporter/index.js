const mocha = require('mocha');
const defaults = require('lodash.defaults');


const defaultConfig = {
  batch: true,
  meta: {},
};

const ReflowReporter = function(runner, options) {
  const {
    batch,
    flowNodes,
    meta,
  } = defaults(options && options.reporterOptions, defaultConfig);

  mocha.reporters.Base.call(this, runner);
  let passes = 0;
  let failures = 0;
  const stats = this.stats;

  let indents = 0;
  let result = [];

  function report (data) {
    result.push({
      ...data,
      meta,
    })
    if(!batch) {
      submitReport();
    }
  }

  function submitReport() {
    if(result.length) {
      process.stdout.write(JSON.stringify(result));
      results = [];
    }
  }

  function indent () {
    return indents;
  }


  runner.on('start', function() {
    report({
      startTime: (new Date()).toUTCString(),
      totalSuites: runner.grepTotal(runner.suite),
      flowNodes,
    })
  });

  runner.on('suite', function (suite) {
    ++indents;
    // console.log(color('suite', '%s%s'), indent(), suite.title);
  });

  runner.on('suite end', function () {
    --indents;
  });


  runner.on('pass', function (test) {
    report({
      status: 'pass',
      speed: test.speed,
      title: test.title,
      indent: indent(),
    })
  });


  runner.on('pending', function (test) {
    report({
      status: 'pending',
      title: test.title,
      indent: indent(),
    })
  });

  runner.on('fail', function (test) {
    report({
      status: 'fail',
      title: test.title,
      indent: indent(),
    })
  });

  runner.on('end', function() {
    report({
      status: 'done',
      tests: stats.tests,
      failures: stats.failures,
      errors: stats.failures,
      skipped: stats.tests - stats.failures - stats.passes,
      endTime: (new Date()).toUTCString(),
      time: (stats.duration / 1000) || 0,
    })
    submitReport();
  })
}

module.exports = ReflowReporter;
