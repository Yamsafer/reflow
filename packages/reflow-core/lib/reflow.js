import _ from 'lodash'

import threadPool from './thread-pool';
import lookupFiles from './utils/lookup-files';
import executeMatrix from './execute'
import { evaluateFlow, evaluateSubflow } from './evaluate';
import analyzeMatrix from './analyze'
import FlakeId from 'flakeid'


const createReflowContext = function(filepath) {
  const self = this;
  return {
    describe(name) {
      self.suites[name] = filepath
    },
    subflow(name, configCb) {
      console.log(`Registering "${name}" Subflow.`);
      self.subflows[name] = configCb
    },
    flow(name, fn) {
      self.flows[name] = {
        name,
        path: filepath,
        fn,
      };
    },
    hook(name) {
      console.log(`Registering "${name}" Hook.`);
      self.hooks[name] = filepath;
    },
    getHook(name, tags) {
      const suitePath = self.hooks[name];
      if(!suitePath) throw new Error(`Unable to find hook [ ${name} ].`);
      return {
        name,
        tags,
        path: suitePath,
        type: 'hook',
      }
    },
    getSubflow(name, tags) {
      const subflowDetail = self.subflows[name];
      if(!subflowDetail) throw new Error(`Unable to get subflow [ ${name} ].`);
      const activeTags = self.options.tags;

      if(_.isMatch(tags, activeTags)) {
        return evaluateSubflow(name , subflowDetail)
      }
      return null;
    },
    getSuite(name, tags) {
      const suitePath = self.suites[name];
      if(!suitePath) throw new Error(`Unable to find suite [ ${name} ].`);
      return {
        name,
        tags,
        path: suitePath,
        type: 'suite',
      };
    },
    fork(suites) {

      const activeTags = self.options.tags;

      const activeFork = suites
        .filter(Boolean)
        .filter(suite => _.isMatch(suite.tags, activeTags))
        .filter(Boolean)

      return activeFork.length? activeFork : null
    },
  }
};

class Reflow {
  constructor(options) {
    this.options = options;
    this.files = [];
    this.suites = {};
    this.subflows = {};
    this.flows = {};
    this.hooks = {};
    this.flake = new FlakeId();

    this.run = false;

  }

  gatherMatrices() {
    this.files.forEach(filepath => {
      Object.assign(global, createReflowContext.call(this, filepath))
      require(filepath);
    })
  }
  runFlows() {
    const flowsList = Object.values(this.flows);
    console.log(`${flowsList.length} total flows.`)
    flowsList.forEach(this.runFlow.bind(this))
  }
  analyzeFlows() {
    const analyzedMatrices = Object.values(this.flows).map(this.analyze.bind(this));
    analyzedMatrices.forEach(({name, analysis}) => {
      console.log(`${name}: (${analysis.length} combinations)`,)
      console.log(analysis.join('\n'));
    })
  }

  analyze({name, fn}) {
    const suites = fn();
    const matrix = evaluateFlow(suites, this.options.tags);

    return {
      name,
      analysis: analyzeMatrix(matrix),
    };
  }

  runFlow({name, fn}) {
    const suites = fn();
    if(!_.isArray(suites)) throw new Error(`no suites provided in flow "${name}".`);
    const matrix = evaluateFlow(suites, this.options.tags);

    const totalCombinations = matrix.length;
    const normalizedMatrix = matrix.map((tree, i) => ({
      name: `${name}: combination #${i+1}/${totalCombinations}`,
      type: "tree",
      index: i,
      suites: tree,
    }))

    const threadCount = Math.min(this.options.numberOfThreads, totalCombinations);
    const totalFlows = Object.keys(this.flows).length
    const jobDetails = {
      id: this.flake.gen(),
      numberOfThreads: threadCount,
      numberOfCombinations: totalCombinations,
      numberOfFlows: totalFlows,
      tags: this.options.tags,
      startTime: new Date(),
    }

    const flowDetails = {
      id: this.flake.gen(),
      title: name,
    }

    console.log(`Spinning of ${threadCount} threads.`);
    console.log(`${name}: (${totalCombinations} total combinations)`)

    executeMatrix(normalizedMatrix, {
      ...this.options,
      flowDetails,
      jobDetails,
    });
  }
}


export {
  threadPool,
  lookupFiles,
}

export default Reflow
