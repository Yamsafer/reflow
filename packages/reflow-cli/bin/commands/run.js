const os = require('os');
const parseCaps = require('../parse-caps');
exports.command = 'run'

exports.describe = 'run reflow cases'

exports.builder = {
  recursive: {
    default: false,
  },
  mocha: {
    type: 'object',
    description: 'options passed to mocha',
    default: {
      require: [],
    },
  },
  "mocha.reporter": {
    alias:'mochaReporter',
    type: 'string',
    description: 'mocha reporter',
  },
  job: {
    type: 'object',
    description: 'job details',
    default: {},
  },
  "job.id": {
    alias: 'buildNumber',
    type: 'string',
    description: 'job Id',
  },
  "job.source": {
    alias:'sourceBranch',
    type: 'string',
    description: 'Github branch to test against.',
  },
  "job.target": {
    alias:'targetBranch',
    type: 'string',
    description: 'Github branch where the tests live.',
  },
  extensions: {
    type: 'array',
    default: [],
  },
  tags: {
    type: 'array',
    default: [],
  },
  threads: {
    alias: 'numberOfThreads',
    default: os.cpus().length,
  },
}

exports.handler = function (config) {
  console.log('config::', config)
  const _ = require('lodash');
  const path = require('path');
  const fs = require('fs');
  const {
    default: Reflow,
    lookupFiles,
    loadModules,
    dynamicRunner,
    Module,
    createContext,
  } = require('reflow-core');

  const ROOTPATH = process.cwd();
  var resolve = path.resolve;
  var exists = fs.existsSync || path.existsSync;

  config.mocha.require = config.mocha.require.map(mod => {
    var abs = exists(mod) || exists(mod + '.js');
    if (abs) {
      return resolve(mod);
    }
    return mod;
  });

  config.mocha.require.forEach(module => {
    require(module)
  })
  // const callerFilename = path.join(ROOTPATH, 'index.js');
  // const customActions = require('../parse-dir')(config.extendActions, callerFilename);
  config.customActions = path.join(ROOTPATH, config.extendActions, 'index.js');

  const caps = parseCaps(config.caps);

  const reflow = new Reflow(config, caps);

  reflow.files = _(config.files)
                  .flatMap(lookupFiles(ROOTPATH, config))
                  .compact()
                  .value();

  try {
    reflow.gatherMatrices()
  } catch (err) {
    console.error('Error Gathering Matrices')
    console.error(err);
    process.exit(1);
  }
  try {
    reflow.runFlows()
  } catch(err) {
    console.error('Error Running Flows')
    console.error(err);
    throw err
  }
}
