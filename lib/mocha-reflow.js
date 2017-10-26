import Mocha from 'mocha';
import './interfaces/bdd';
import path from 'path';

import createDynamicRunner from './runner/dynamic-runner';
import {createContext} from './runner/Module';


class MochaRefow extends Mocha {
  constructor(tree, options) {
    super(options)

    this.dynamicRunner = createDynamicRunner();
    this.environment = options.environment;
  }
  
  loadFiles(fn) {
    var self = this;
    var suite = this.suite;
    var mochaContext = this.environment;
    var dynamicRunner = this.dynamicRunner;

    this.files.forEach(function (file) {
      const filePath = path.resolve(file);

      suite.emit('pre-require', mochaContext.context, filePath, self);
      suite.emit('require', dynamicRunner(filePath, mochaContext), filePath, self);
      suite.emit('post-require', mochaContext.context, filePath, self);
    });
    fn && fn();
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

export {Mocha}
export default MochaRefow







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
