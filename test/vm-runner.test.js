import createVM from '../src/runner/createVM';
import createRunner from '../src/runner/createRunner';
import {createContext} from '../src/runner/Module'
import path from 'path'

const subflows = {};
const suites = {};

describe.only('VM Runner', function() {

  it('..', function() {

    const vm = createRunner({
      'hooked-describe.js': path.join(__dirname, './fixture/suite/hooked-describe.js'),
      'standard-describe.js': path.join(__dirname, './fixture/suite/standard-describe.js'),
    }, {
      environment(filepath) {
        return {
          context: createContext({
            describe(name) {
              suites[name] = filepath
            },
            subflow(name) {
              subflows[name] = filepath
            }
          })
        }
      }
    })

  })
})