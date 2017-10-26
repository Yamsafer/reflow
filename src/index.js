import threadPool from './thread-pool';

import createRunner from './runner/createRunner';
import {createContext} from './runner/Module';


import executeMatrix from './execute'
import { evaluateFlow, evaluateSubflow } from './evaluate';


class Reflow {
  constructor(options) {
    // this.cwd = options.cwd || process.cwd();
    this.files = [];
    this.suites = {};
    this.subflows = {};
    this.flows = {};
    this.hooks = {};
    this.vm = null;
    this.run = false;
  }

  runFiles() {
    const self = this;

    const filesObj = this.files.reduce((acc, filepath) => ({ ...acc, [filepath]: filepath}), {})

    this.vm = createRunner(filesObj, {
      environment(filepath) {
        return {
          context: createContext({
            describe(name) {
              self.suites[name] = filepath
            },
            subflow(name, configCb) {
              console.log(`Registering "${name}" Subflow.`);
              self.subflows[name] = configCb
            },
            flow(name, fn) {
              self.flows[name] = filepath
              if(self.run) {
                self.runFlow(name, fn)
              }
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
        }
      }
    });

  }
  runFlows() {
    this.run = true;
    Object.values(this.flows).forEach(this.vm);
    this.run = false;
  }

  runFlow(name, fn) {
    const suites = fn();
    const executionMatrix = evaluateFlow(name, suites);
        
    const config = {
      name,
    }
    console.log('executing matrix')
    executeMatrix(executionMatrix, config);
  }
}


export {
  threadPool,
}

export default Reflow
