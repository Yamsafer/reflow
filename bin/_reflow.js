#!/usr/bin/env node
'use strict';

const path = require('path');
const _ = require('lodash');

const getConfigs = require('./configs');
const {
  default: Reflow,
  lookupFiles,
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

const reflow = new Reflow(config);

reflow.files = _(config.files)
                .flatMap(lookupFiles(ROOTPATH, config))
                .compact()
                .value()

reflow.gatherMatrices()
reflow.runFlows()
