'use strict';

/**
 * Module dependencies.
 */

import Mocha, {Test, Hook} from 'mocha';

/**
 * BDD-style interface:
 *
 *      describe('Array', function() {
 *        describe('#indexOf()', function() {
 *          it('should return -1 when not present', function() {
 *            // ...
 *          });
 *
 *          it('should return the index when present', function() {
 *            // ...
 *          });
 *        });
 *      });
 *
 * @param {Suite} suite Root suite.
 */
module.exports = Mocha.interfaces['reflow-bdd'] = function (suite) {
  var suites = [suite];
  var hooks = [];

  suite.on('pre-require', function (context, file, mocha) {
    var common = require('mocha/lib/interfaces/common')(suites, context, mocha);

    context.before = common.before;
    context.after = common.after;
    context.beforeEach = common.beforeEach;
    context.afterEach = common.afterEach;
    context.run = mocha.options.delay && common.runWithSuite(suite);
    /**
     * Describe a "suite" with the given `title`
     * and callback `fn` containing nested suites
     * and/or tests.
     */

    context.describe = context.context = function (title, fn) {
      const newSuite = common.suite.create({
        title: title,
        file: file,
        fn: fn
      });


      while(hooks.length) {
        var {
          name,
          before,
          after,
        } = hooks.shift();

        before && newSuite.beforeAll(name, before);
        after && newSuite.afterAll(name, after);
      }

      return newSuite
    };

    /**
     *  Hooks
     */
    
    context.hook = function(name, getFns) {
      var suite = suites[0];
      const newHooks = getFns()
      hooks.push({name, ...newHooks})

      newHooks.beforeAll && suite.beforeAll(newHooks.beforeAll);
      newHooks.afterAll && suite.afterAll(newHooks.afterAll);
      return 
    }
    
    /**
     * Pending describe.
     */

    context.xdescribe = context.xcontext = context.describe.skip = function (title, fn) {
      return common.suite.skip({
        title: title,
        file: file,
        fn: fn
      });
    };

    /**
     * Exclusive suite.
     */

    context.describe.only = function (title, fn) {
      return common.suite.only({
        title: title,
        file: file,
        fn: fn
      });
    };

    /**
     * Describe a specification or test-case
     * with the given `title` and callback `fn`
     * acting as a thunk.
     */

    context.it = context.specify = function (title, fn) {
      var suite = suites[0];
      if (suite.isPending()) {
        fn = null;
      }
      var test = new Test(title, fn);
      test.file = file;
      suite.addTest(test);
      return test;
    };

    /**
     * Exclusive test-case.
     */

    context.it.only = function (title, fn) {
      return common.test.only(mocha, context.it(title, fn));
    };

    /**
     * Pending test case.
     */

    context.xit = context.xspecify = context.it.skip = function (title) {
      context.it(title);
    };

    /**
     * Number of attempts to retry.
     */
    context.it.retries = function (n) {
      context.retries(n);
    };
  });
};