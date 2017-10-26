#!/usr/bin/env node
'use strict';

/* eslint no-unused-vars: off */

/**
 * Module dependencies.
 */

var program = require('commander');
var path = require('path');
var fs = require('fs');
var resolve = path.resolve;
var exists = fs.existsSync || path.existsSync;
var Mocha = require('mocha');
var Reflow = require('../distribution/reflow').default;
var utils = Mocha.utils;
var interfaceNames = Object.keys(Mocha.interfaces);
var join = path.join;
var cwd = process.cwd();
var getOptions = require('./options');

var mocha = new Reflow();

/**
 * Files.
 */

var files = [];

/**
 * Globals.
 */

var globals = [];

/**
 * Requires.
 */

var requires = [];


// options

program
  .version(JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8')).version)
  .usage('[debug] [options] [files]')
  .option('-A, --async-only', 'force all tests to take a callback (async) or return a promise')
  .option('-c, --colors', 'force enabling of colors')
  .option('-C, --no-colors', 'force disabling of colors')
  .option('-G, --growl', 'enable growl notification support')
  .option('-O, --reporter-options <k=v,k2=v2,...>', 'reporter-specific options')
  .option('-R, --reporter <name>', 'specify the reporter to use', 'spec')
  .option('-S, --sort', 'sort test files')
  .option('-b, --bail', 'bail after first test failure')
  .option('-d, --debug', "enable node's debugger, synonym for node --debug")
  .option('-g, --grep <pattern>', 'only run tests matching <pattern>')
  .option('-f, --fgrep <string>', 'only run tests containing <string>')
  .option('-gc, --expose-gc', 'expose gc extension')
  .option('-i, --invert', 'inverts --grep and --fgrep matches')
  .option('-r, --require <name>', 'require the given module')
  .option('-s, --slow <ms>', '"slow" test threshold in milliseconds [75]')
  .option('-t, --timeout <ms>', 'set test-case timeout in milliseconds [2000]')
  .option('-u, --ui <name>', 'specify user-interface (' + interfaceNames.join('|') + ')', 'bdd')

  .option('--check-leaks', 'check for global variable leaks')
  .option('--full-trace', 'display the full stack trace')
  .option('--compilers <ext>:<module>,...', 'use the given module(s) to compile files', list, [])
  .option('--debug-brk', "enable node's debugger breaking on the first line")
  .option('--globals <names>', 'allow the given comma-delimited global [names]', list, [])
  .option('--es_staging', 'enable all staged features')
  .option('--harmony<_classes,_generators,...>', 'all node --harmony* flags are available')
  .option('--preserve-symlinks', 'Instructs the module loader to preserve symbolic links when resolving and caching modules')
  .option('--icu-data-dir', 'include ICU data')
  .option('--inline-diffs', 'display actual/expected differences inline within each string')
  .option('--inspect', 'activate devtools in chrome')
  .option('--inspect-brk', 'activate devtools in chrome and break on the first line')
  .option('--interfaces', 'display available interfaces')
  .option('--no-deprecation', 'silence deprecation warnings')
  .option('--exit', 'force shutdown of the event loop after test run: mocha will call process.exit')
  .option('--no-timeouts', 'disables timeouts, given implicitly with --debug')
  .option('--no-warnings', 'silence all node process warnings')
  .option('--opts <path>', 'specify opts path', 'test/mocha.opts')
  .option('--perf-basic-prof', 'enable perf linux profiler (basic support)')
  .option('--napi-modules', 'enable experimental NAPI modules')
  .option('--prof', 'log statistical profiling information')
  .option('--log-timer-events', 'Time events including external callbacks')
  .option('--recursive', 'include sub directories')
  .option('--reporters', 'display available reporters')
  .option('--retries <times>', 'set numbers of time to retry a failed test case')
  .option('--throw-deprecation', 'throw an exception anytime a deprecated function is used')
  .option('--trace', 'trace function calls')
  .option('--trace-deprecation', 'show stack traces on deprecations')
  .option('--trace-warnings', 'show stack traces on node process warnings')
  .option('--use_strict', 'enforce strict mode')
  .option('--delay', 'wait for async suite definition')
  .option('--allow-uncaught', 'enable uncaught errors to propagate')
  .option('--forbid-only', 'causes test marked with only to fail the suite')
  .option('--forbid-pending', 'causes pending tests and test marked with skip to fail the suite');

program._name = 'reflow';

// --globals

program.on('option:globals', function (val) {
  globals = globals.concat(list(val));
});

// --reporters

program.on('option:reporters', function () {
  console.log();
  console.log('    dot - dot matrix');
  console.log('    doc - html documentation');
  console.log('    spec - hierarchical spec list');
  console.log('    json - single json object');
  console.log('    progress - progress bar');
  console.log('    list - spec-style listing');
  console.log('    tap - test-anything-protocol');
  console.log('    landing - unicode landing strip');
  console.log('    xunit - xunit reporter');
  console.log('    min - minimal reporter');
  console.log('    json-stream - newline delimited json events');
  console.log('    markdown - markdown documentation (github flavour)');
  console.log('    nyan - nyan cat!');
  console.log();
  process.exit();
});

// --interfaces

program.on('option:interfaces', function () {
  console.log('');
  interfaceNames.forEach(function (interfaceName) {
    console.log('    ' + interfaceName);
  });
  console.log('');
  process.exit();
});

// -r, --require

module.paths.push(cwd, join(cwd, 'node_modules'));

program.on('option:require', function (mod) {
  var abs = exists(mod) || exists(mod + '.js');
  if (abs) {
    mod = resolve(mod);
  }
  requires.push(mod);
});

// If not already done, load mocha.opts
if (!process.env.LOADED_MOCHA_OPTS) {
  getOptions();
}

// parse args

program.parse(process.argv);

// infinite stack traces

Error.stackTraceLimit = Infinity; // TODO: config

// reporter options

var reporterOptions = {};
if (program.reporterOptions !== undefined) {
  program.reporterOptions.split(',').forEach(function (opt) {
    var L = opt.split('=');
    if (L.length > 2 || L.length === 0) {
      throw new Error("invalid reporter option '" + opt + "'");
    } else if (L.length === 2) {
      reporterOptions[L[0]] = L[1];
    } else {
      reporterOptions[L[0]] = true;
    }
  });
}

// reporter

mocha.reporter(program.reporter, reporterOptions);

// load reporter

var Reporter = null;
try {
  Reporter = require('mocha/lib/reporters/' + program.reporter);
} catch (err) {
  try {
    Reporter = require(program.reporter);
  } catch (err2) {
    throw new Error('reporter "' + program.reporter + '" does not exist');
  }
}

// --no-colors

if (!program.colors) {
  mocha.useColors(false);
}

// --colors

if (~process.argv.indexOf('--colors') || ~process.argv.indexOf('-c')) {
  mocha.useColors(true);
}

// --inline-diffs

if (program.inlineDiffs) {
  mocha.useInlineDiffs(true);
}

// --slow <ms>

if (program.slow) {
  mocha.suite.slow(program.slow);
}

// --no-timeouts

if (!program.timeouts) {
  mocha.enableTimeouts(false);
}

// --timeout

if (program.timeout) {
  mocha.suite.timeout(program.timeout);
}

// --bail

mocha.suite.bail(program.bail);

// --grep

if (program.grep) {
  mocha.grep(program.grep);
}

// --fgrep

if (program.fgrep) {
  mocha.fgrep(program.fgrep);
}

// --invert

if (program.invert) {
  mocha.invert();
}

// --check-leaks

if (program.checkLeaks) {
  mocha.checkLeaks();
}

// --stack-trace

if (program.fullTrace) {
  mocha.fullTrace();
}

// --growl

if (program.growl) {
  mocha.growl();
}

// --async-only

if (program.asyncOnly) {
  mocha.asyncOnly();
}

// --delay

if (program.delay) {
  mocha.delay();
}

// --allow-uncaught

if (program.allowUncaught) {
  mocha.allowUncaught();
}

// --globals

mocha.globals(globals);

// --retries

if (program.retries) {
  mocha.suite.retries(program.retries);
}

// --forbid-only

if (program.forbidOnly) mocha.forbidOnly();

// --forbid-pending

if (program.forbidPending) mocha.forbidPending();

// requires

requires.forEach(function (mod) {
  require(mod);
});

// interface

mocha.ui(program.ui);

// args

var args = program.args;


args.forEach(function (arg) {
  var newFiles;
  try {
    newFiles = utils.lookupFiles(arg, extensions, program.recursive);
  } catch (err) {
    if (err.message.indexOf('cannot resolve path') === 0) {
      console.error('Warning: Could not find any test files matching pattern: ' + arg);
      return;
    }

    throw err;
  }

  files = files.concat(newFiles);
});

if (!files.length) {
  console.error('No test files found');
  process.exit(1);
}

// resolve

files = files.map(function (path) {
  return resolve(path);
});

if (program.sort) {
  files.sort();
}


var runner;

mocha.files = files;
runner = mocha.run(program.exit ? exit : exitLater);


function exitLater (code) {
  process.on('exit', function () {
    process.exit(Math.min(code, 255));
  });
}

function exit (code) {
  var clampedCode = Math.min(code, 255);

  // Eagerly set the process's exit code in case stream.write doesn't
  // execute its callback before the process terminates.
  process.exitCode = clampedCode;

  // flush output for Node.js Windows pipe bug
  // https://github.com/joyent/node/issues/6247 is just one bug example
  // https://github.com/visionmedia/mocha/issues/333 has a good discussion
  function done () {
    if (!(draining--)) {
      process.exit(clampedCode);
    }
  }

  var draining = 0;
  var streams = [process.stdout, process.stderr];

  streams.forEach(function (stream) {
    // submit empty write request and wait for completion
    draining += 1;
    stream.write('', done);
  });

  done();
}

process.on('SIGINT', function () {
  runner.abort();

  // This is a hack:
  // Instead of `process.exit(130)`, set runner.failures to 130 (exit code for SIGINT)
  // The amount of failures will be emitted as error code later
  runner.failures = 130;
});

