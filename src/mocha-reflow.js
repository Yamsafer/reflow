// import Mocha from 'mocha';
const Mocha = require('mocha')
// RUNNER EVENTS
// *   - `start`  execution started
// *   - `end`  execution complete
// *   - `suite`  (suite) test suite execution started
// *   - `suite end`  (suite) all tests (and sub-suites) have finished
// *   - `test`  (test) test execution started
// *   - `test end`  (test) test completed
// *   - `hook`  (hook) hook execution started
// *   - `hook end`  (hook) hook complete
// *   - `pass`  (test) test passed
// *   - `fail`  (test, err) test failed
// *   - `pending`  (test) test pending
// CONFIG::
// grep
// ui
// reporter
// timeout
// bail 
// useColors
// retries
// slow
// ignoreLeaks
// fullTrace
// 

class MochaRefow extends Mocha {
  constructor(fork, options) {
    super(options)
    this.fork = fork;
    if(this.fork.before) {
      this.suite.beforeAll("Before All", this.fork.before)
    }
  }
  run(fn) {
    if (this.files.length) {
      this.loadFiles();
    }
    var suite = this.suite;
    var options = this.options;
    options.files = this.files;

    var runner = new Mocha.Runner(suite, options.delay);
    var reporter = new this._reporter(runner, options);
    runner.ignoreLeaks = options.ignoreLeaks !== false;
    runner.fullStackTrace = options.fullStackTrace;
    runner.asyncOnly = options.asyncOnly;
    runner.allowUncaught = options.allowUncaught;
    runner.forbidOnly = options.forbidOnly;
    runner.forbidPending = options.forbidPending;
    if (options.grep) {
      runner.grep(options.grep, options.invert);
    }
    if (options.globals) {
      runner.globals(options.globals);
    }
    if (options.growl) {
      this._growl(runner, reporter);
    }
    if (options.useColors !== undefined) {
      Mocha.reporters.Base.useColors = options.useColors;
    }
    Mocha.reporters.Base.inlineDiffs = options.useInlineDiffs;

    function done (failures) {
      if (reporter.done) {
        reporter.done(failures, fn);
      } else {
        fn && fn(failures);
      }
    }

    return runner.run(done);
  }
}

module.exports = MochaRefow
