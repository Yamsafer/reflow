import threadPool from './thread-pool';
import createVM from './runner/createVM';
import createRunner from './runner/createRunner';
import {createContext} from './runner/Module';


class Reflow {
  constructor(options) {
    // this.cwd = options.cwd || process.cwd();
    this.files = [];
    this.suites = {};
    this.subflows = {};
    this.flows = {};
  }

  runFiles() {
    const self = this;

    const filesObj = this.files.reduce((acc, filepath) => ({ ...acc, [filepath]: filepath}), {})

    console.log('filesObj::', filesObj)
    const vm = createRunner(filesObj, {
      environment(filepath) {
        return {
          context: createContext({
            describe(name) {
              self.suites[name] = filepath
            },
            subflow(name) {
              self.subflows[name] = filepath
            },
            flow(name) {
              self.flows[name] = filepath
            }
          })
        }
      }
    });

  }
}


export {
  threadPool,
}

export default Reflow
