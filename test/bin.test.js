#!/usr/bin/env node
'use strict';
import Reflow from '../src/';
import { utils } from 'mocha'
import path from 'path';

const reflow = new Reflow();

const cwd = process.cwd();
const subflowPath = path.join(cwd, './example/subflow/**/*.js');
const flowPath = path.join(cwd, './example/flow/**/*.js');
const suitesPath = path.join(cwd, './example/suites/**/*.js');
const hooksPath = path.join(cwd, './example/hooks/**/*.js');

const globs = [
  subflowPath,
  flowPath,
  suitesPath,
  hooksPath,
]


describe.only('bin entrance', function() {
  it("", function() {
    let files = [];
    const extensions = [];
    const recursive = false; //program.recursive


    globs.forEach(function (glob) {
      let newFiles;
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
    reflow.runFlows()
  })
})