#!/usr/bin/env node
'use strict';

const path = require('path');
const _ = require('lodash');
const fs = require('fs');

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
  tags: [],
  extensions: [],
  recursive: false,
});

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
reflow.runFlows()
