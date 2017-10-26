import threadPool from './thread-pool';

import dynamicRunner from './runner/dynamic-runner';
import createContext from './runner/create-context';

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
    getHook(name) {
      const suitePath = self.hooks[name];
      if(!suitePath) throw new Error(`Unable to find hook [ ${name} ].`);
      return {
        name,
        path: suitePath,
        type: 'hook',
      }
    },
    getSubflow(name) {
      const subflowDetail = self.subflows[name];
      if(!subflowDetail) throw new Error(`Unable to get subflow [ ${name} ].`);

      return evaluateSubflow(name , subflowDetail)
    },
    getSuite(name) {
      const suitePath = self.suites[name];
      if(!suitePath) throw new Error(`Unable to find suite [ ${name} ].`);
      return {
        name,
        path: suitePath,
        type: 'suite',
      };
    },
    fork(suites) {
      return suites
    },
  })
};

class Reflow {
  constructor(options) {

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
    Object.values(this.flows).forEach(this.runFlow)
  }

  runFlow({name, fn}) {
    const suites = fn();
    const executionMatrix = evaluateFlow(name, suites);
        
    const config = {
      name,
    }

    executeMatrix(executionMatrix, config);
  }
}


export {
  threadPool,
}

export default Reflow
