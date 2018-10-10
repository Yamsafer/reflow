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
const withSubflow1FlowPath = getFixturePath('flows/withSubflow1.js')
const withSubflow2FlowPath = getFixturePath('flows/withSubflow2.js')
const withForksFlowPath = getFixturePath('flows/withForks.js')


describe.only("Generate Matrix", function() {
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
  describe.only("Subflows", function() {
    let generateMetrix: any;
    before(async function() {
      const matrixConfig:ReflowConfig = {
        suites: suitesGlob,
        subflows: subflowsGlob,
      }
      generateMetrix = await createMatrixGenerator(matrixConfig);
    })
    it("generates Matrix", async function() {
      const matrix = await generateMetrix(withSubflow1FlowPath);
      const matrixNames = matrix.map((entry: any) => entry.name);
      expect(matrixNames).to.deep.equal(['Suite 1', 'Suite 2'])
    })
    it("generates Matrix with subflows that are forked", async function() {
      const matrix = await generateMetrix(withSubflow2FlowPath);
      const matrixNames = matrix.map((entry: any) => entry.name);
      expect(matrixNames).to.deep.equal(['Suite 4', 'Suite 1', ['Suite 2', 'Suite 3']])
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
