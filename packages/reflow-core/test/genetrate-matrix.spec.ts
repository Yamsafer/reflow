/// <reference path="typings/globals.d.ts" />
import {ReflowConfig} from '../src';

import {
  createMatrixGenerator,
} from '../src/generate-matrix';

import * as path from 'path';
const cwd = process.cwd()

const getFixturePath = path.join.bind(path, cwd, './test/fixture')
const suitesGlob = getFixturePath('suites/**/*.js');
const subflowsGlob = getFixturePath('subflows/**/*.js')

const suitesOnlyFlowPath = getFixturePath('flows/SuitesOnly.js')
const withSubflowsFlowPath = getFixturePath('flows/withSubflows.js')
const withForksFlowPath = getFixturePath('flows/withForks.js')


describe("Generate Matrix", function() {
  describe("Suites", function() {
    let generateMetrix: any;
    before(async function() {
      const matrixConfig:ReflowConfig = {
        suites: suitesGlob,
      }
      generateMetrix = await createMatrixGenerator(matrixConfig);
    })
    it("generates Matrix", async function() {
      const matrix = await generateMetrix(suitesOnlyFlowPath)
      const matrixNames = matrix.map((entry: any) => entry.name);
      expect(matrixNames).to.deep.equal(['Suite 1', 'Suite 2'])
    })
  })
  describe("Subflows", function() {
    let generateMetrix: any;
    before(async function() {
      const matrixConfig:ReflowConfig = {
        suites: suitesGlob,
        subflows: subflowsGlob,
      }
      generateMetrix = await createMatrixGenerator(matrixConfig);
    })
    it("generates Matrix", async function() {
      const matrix = await generateMetrix(withSubflowsFlowPath)
      console.log('subflow matrix::', matrix)
      const matrixNames = matrix.map((entry: any) => entry.name);
      expect(matrixNames).to.deep.equal(['Subflow 1', 'Suite 2'])
    })
  })
  describe("Forks", function() {
    let generateMetrix: any;
    before(async function() {
      const matrixConfig:ReflowConfig = {
        suites: suitesGlob,
        subflows: subflowsGlob,
      }
      generateMetrix = await createMatrixGenerator(matrixConfig);
    })
    it("generates Matrix", async function() {
      const matrix = await generateMetrix(withForksFlowPath)
      console.log('matrix::', matrix)
      // const matrixNames = matrix.map((entry: any) => entry.name);
      // expect(matrixNames).to.deep.equal(['Subflow 1', 'Suite 2'])
    })
  })
})
