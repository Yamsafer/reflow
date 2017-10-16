'use strict';

import assert from 'assert';
import Mocha from 'mocha';

let runnerInstance;

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
export const createInstance = (config) => {
    assert(!runnerInstance, 'Runner instance has already been created. Use getInstance() instead');
    const mocha = new Mocha(config);
    return mocha

};

export const getInstance = () => {
    assert(runnerInstance, 'No runner instance is available. Run createInstance() first');
    return runnerInstance;
};
