'use strict'
import _ from 'lodash';
import cartesian from './cartesian';

const evaluateSubflow = function(name, getDetail) {
  const {suites, ...rest} = getDetail() || {};
  if(!_.isArray(suites)) throw new Error(`no suites provided in subflow "${name}".`);
  // console.log('cartesian(suites)::', cartesian(suites))
  
  const cartesianed = cartesian(...suites.map(suite => _.isArray(suite)? suite : [suite]));

  return cartesianed.map(combination => {
    return {
      type: 'subflow',
      name,
      ...rest,
      suites: combination,
    }
  })
  // return {
  //   suites: cartesian(...suites.map(suite => _.isArray(suite)? suite : [suite])),
  // }
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
  // if(suite.type === "fork") {
  //   return suite.suites.reduce((acc, forkSuite) => {
  //     acc.push(evaluateType(forkSuite));
  //     return acc;
  //   }, []);
  // }

}
const types = ["suite", "subflow", "fork"];

const evaluateFlow = function(name, suites) {
  if(!_.isArray(suites)) throw new Error(`no suites provided in flow "${name}".`);

  // const arrayedSuites = suites.map(suite => _.isArray(suite)? suite : [suite]);

  // console.log('evaluating flow with suites:::', suites)

  const formattedSuites = suites
    // .filter(suite => types.includes(suite.type))
    .reduce((acc, branch) => {
      // console.log("branch::", branch)

      if(branch.type === "suite") {
        acc.push([branch])
      }

      if(_.isArray(branch)) {
        acc.push(branch);
      }
      
      return acc;
    }, []);
  const cartesianed = cartesian(...formattedSuites);
  if(cartesianed) {
    const conditionedCart = cartesianed.map(combination => combination.reduce((acc, branch) => {
      // console.log('branch', branch)
      if(branch.type === "subflow" && branch.condition) {
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
  //   .reduce((acc, suite) => {
  //     const evaluated = evaluateType(suite);
  //     if(suite.type === "subflow") {
  //       return evaluated.concat(evaluated)
  //     }
  //     acc.push(evaluated)
  //     return acc;

  //   }, [])

  // return suites;

  return cartesianed;
}

export {
  evaluateFlow,
  evaluateSubflow,
}