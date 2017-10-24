#!/usr/bin/env node
'use strict';
const Reflow = require('../distribution/_index.js').default;
const reflow = new Reflow();

const { utils } = require('mocha');

const path = require('path');
const cwd = process.cwd();
const subflowPath = path.join(cwd, './example/subflow/**/*.js');
const flowPath = path.join(cwd, './example/flow/**/*.js');
const suitesPath = path.join(cwd, './example/suites/**/*.js');

const globs = [
  subflowPath,
  flowPath,
  suitesPath,
]

let files = [];
const extensions = [];
const recursive = false; //program.recursive

globs.forEach(function (glob) {
  var newFiles;
  try {
    newFiles = utils.lookupFiles(glob, extensions, recursive);
  } catch (err) {
    if (err.message.indexOf('cannot resolve path') === 0) {
      console.error('Warning: Could not find any test files matching pattern: ' + arg);
      return;
    }

    throw err;
  }

  files = files.concat(newFiles);
});

reflow.files = files;

reflow.runFiles()

console.log('reflow::', reflow)
// const filesObj = globs.reduce((acc, glob) => acc.concat(utils.lookupFiles(glob, [])), [])
//      .reduce((acc, filepath) => ({ ...acc, [filepath]: filepath}), {})

