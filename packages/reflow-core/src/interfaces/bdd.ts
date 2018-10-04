import * as Mocha from 'mocha';

Mocha.interfaces['reflow-bdd'] = reflowBddInterface

export default
function reflowBddInterface(suite) {
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
        fn: function() {
          while(hooks.length) {
            var {
              name,
              before: beforeFn,
              after: afterFn,
            } = hooks.shift();

            beforeFn && before(beforeFn);
            afterFn && after(afterFn);
          }
          fn.call(this)
        }
      });

      return newSuite
    };

    // context.metadata = function(...args) {
    //   console.log('WERWERWERWER')
    //   try{
    //     var suite = suites[0];
    //     // suite.metadata = args;
    //     // console.log(':suite.metadata:', Object.keys(suite.tests))
    //     console.log(':suite.metadata:', suite.tests)
    //   } catch (err) {
    //     console.log('ERROR::::', err)
    //   }
    // }
    /**
     *  Hooks
     */

    context.hook = function(name, getFns) {
      var suite = suites[0];
      const newHooks = getFns()

      // const newSuite = common.suite.create({
      //   title: name,
      //   file: file,
      //   fn: function() {
      //     newHooks.before && before(newHooks.before)
      //     newHooks.after && after(newHooks.after)
      //     it('does nothing', function() {
      //       console.log('nothing!')
      //     })
      //   }
      // });

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
      var test = new Mocha.Test(title, fn);
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
      return context.it(title);
    };

    /**
     * Number of attempts to retry.
     */
    context.it.retries = function (n) {
      context.retries(n);
    };
  });
};
