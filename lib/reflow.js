import _ from 'lodash'

import threadPool from './thread-pool';
import dynamicRunner from './runner/dynamic-runner';
import createContext from './runner/create-context';

import lookupFiles from './utils/lookup-files';

import executeMatrix from './execute'
import { evaluateFlow, evaluateSubflow } from './evaluate';


const createReflowContext = function(filepath) {
  const self = this;
  return createContext({
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
  })
};

class Reflow {
  constructor(options) {
    this.options = options;
    this.files = [];
    this.suites = {};
    this.subflows = {};
    this.flows = {};
    this.hooks = {};
    this.vm = dynamicRunner();
    this.run = false;
  }

  gatherMatrices() {
    const self = this;

    this.files.forEach(filepath => {
      this.vm(filepath, {
        context: createReflowContext.call(this, filepath)
      })
    })
  }
  runFlows() {
    Object.values(this.flows).forEach(this.runFlow.bind(this))
  }

  runFlow({name, fn}) {
    const suites = fn();
    if(!_.isArray(suites)) throw new Error(`no suites provided in flow "${name}".`);
    const matrix = evaluateFlow(suites, this.options.tags);

        

    const totalForks = matrix.length;
    const normalizedMatrix = matrix.map((tree, i) => ({
      name: `${name}: fork #${i+1}/${totalForks}`,
      type: "tree",
      index: i,
      suites: tree,
    }))
    
    console.log(`${name}: (${totalForks} total flows)`)
    const threadPool = executeMatrix(normalizedMatrix, this.options);
    // threadPool.on('finished', function() {
    //   console.log('finitio')
    // })

  }
}


export {
  threadPool,
  lookupFiles,
}

export default Reflow
