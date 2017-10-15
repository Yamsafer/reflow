'use strict'
import _ from 'lodash';
import { evaluateFlow, evaluateSubflow } from './evaluate';


const subflows = {};

const reflow = function(name, configCb) {
  return evaluateFlow(name, configCb);
}

Object.assign(reflow, {
  getSuite(name) {
    return {
      name,
      type: 'suite',
    };
  },
  fork(suites) {
    return suites
    return {
      type: 'fork',
      suites,
    }
  },
  getSubflow(name) {
    const subflowDetail = subflows[name];
    if(!subflowDetail) throw new Error(`Unable to get subflow "${name}".`);

    return evaluateSubflow(name , subflowDetail)
  },
  subflow(name, configCb) {
    subflows[name] = configCb
  },
  getSubflows() {
    return subflows;
  }
})


export default reflow