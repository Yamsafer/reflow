import _ from 'lodash';
import cartesian from './cartesian';
const types = ["suite", "subflow", "fork", "hook"];
const conditionalTypes = ["subflow", "hook","suite"];


const evaluateSubflow = function(name, getDetail) {
  const {suites, ...rest} = getDetail();
  if(!_.isArray(suites)) throw new Error(`no suites provided in subflow "${name}".`);
  
  
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

const evaluateFlow = function(suites, activeTags) {

  const formattedSuites = suites
    .filter(Boolean)
    .map(branch => _.isArray(branch)? branch : [branch])
    .filter(branch => _.isMatch(branch[0].tags, activeTags))
    .reduce((acc, branch) => {
      acc.push(branch);
      return acc;
    }, []);


  const cartesianed = cartesian(...formattedSuites);

  const conditionedCart = cartesianed
    .map(_.castArray)
    .map(combination => combination.reduce((acc, branch) => {
      if(branch.condition && conditionalTypes.includes(branch.type)) {
        const pass = branch.condition(acc);
        if(!pass) {
          return acc;
        }
      }
      acc.push(branch);
      return acc;
    }, []));

  return _.uniqWith(conditionedCart, _.isEqual);

}

export {
  evaluateFlow,
  evaluateSubflow,
}
