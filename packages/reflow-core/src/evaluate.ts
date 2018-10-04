import * as isMatch from 'lodash.ismatch'
import * as castArray from 'lodash.castarray'
import * as uniqWith from 'lodash.uniqwith'
import * as isEqual from 'lodash.isequal'

import cartesian from './utils/cartesian';
// const types = ["suite", "subflow", "fork", "hook"];
const conditionalTypes = ["subflow", "hook", "fork"];

export
const evaluateSubflow = function(name, getDetail) {
  const {suites, ...rest} = getDetail();
  if(!Array.isArray(suites)) throw new Error(`no suites provided in subflow "${name}".`);


  const cartesianed = cartesian(
    ...suites.map(suite => [].concat(suite))
  ) || [];

  return cartesianed.map(combination => {
    return {
      name,
      type: 'subflow',
      ...rest,
      suites: combination,
    }
  })
}

const evaluateType = function(suite) {
  if(suite.type === "suite") {
    return [suite]
  }
  if(suite.type === "subflow") {
    const acc = [];
    suite.suites.forEach(subflowSuite => {
      acc.push([subflowSuite])
    })
    return acc
  }
  return suite
}

export
const evaluateFlow = function(suites, activeTags) {
  const formattedSuites = suites
    .filter(Boolean)
    .map(branch => Array.isArray(branch)? branch : [branch])
    .filter(branch => isMatch(branch[0].tags, activeTags))
    .reduce((acc, branch) => {
      acc.push(branch);
      return acc;
    }, []);
  const cartesianed = cartesian(...formattedSuites);
  const conditionedCart = cartesianed
    .map(castArray)
    .map(combination => combination.reduce((acc, branch) => {
      if(branch.condition && conditionalTypes.includes(branch.type)) {
        const pass = branch.condition(acc);
        if(!pass) return acc;
      }
      acc.push(branch);
      return acc;
    }, []));

  return uniqWith(conditionedCart, isEqual);
}
