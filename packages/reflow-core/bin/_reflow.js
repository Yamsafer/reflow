#!/usr/bin/env node
'use strict';

const Yargs = require('yargs');
const findUp = require('find-up')

const getConfigs = require('./parse-configs');
const configPath = findUp.sync(['.reflowrc', '.reflowrc.json', 'config.yml'])
const config = getConfigs(configPath);

Yargs
  .commandDir('./commands')
  .config(config)
  .env()
  .showHelpOnFail(true)
  .command({
    command: '*',
    handler() {
      Yargs.showHelp()
    }
  })
  .demandCommand()
  .version()
  .help()
  .argv
