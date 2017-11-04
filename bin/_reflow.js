#!/usr/bin/env node
'use strict';

const path = require('path');
const _ = require('lodash');
const fs = require('fs');
const os = require('os');
const MODES = ['analyze', 'analyse', 'execute'];

const getConfigs = require('./configs');
const {
  default: Reflow,
  lookupFiles,
  loadModules,
  dynamicRunner,
  Module,
  createContext,
} = require('../');

const ROOTPATH = process.cwd();
const configPath = path.join(ROOTPATH, 'config.yml');
const config = _.defaultsDeep(getConfigs(configPath), {
  mocha: {
    require: [],
  },
  numberOfThreads: os.cpus().length,
  tags: [],
  mode: 'execute',
  extensions: [],
  recursive: false,
});

if(!MODES.includes(config.mode)) {
  throw new Error(`Mode not found: ${config.mode}`);
}
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

const reflow = new Reflow(config);

reflow.files = _(config.files)
                .flatMap(lookupFiles(ROOTPATH, config))
                .compact()
                .value()

reflow.gatherMatrices()

if(/analy(z|s)e/.test(config.mode)) {
  reflow.analyzeFlows();
}

if(/execute/.test(config.mode)) {
  reflow.runFlows()
}

