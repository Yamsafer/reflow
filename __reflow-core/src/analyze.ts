import * as union from 'lodash.union';
const scalars = ["suite", "hook"];
const ARROW = ' -> ';

const resolveScalar = function(branch) {
  return branch.name
}

const resolveVector = function(tree) {
  const suites = [].concat(tree.suites);
  return `( ${tree.name}: ${suites.map(resolveTypes).join(ARROW)} )`;
}

const resolveTypes = function(branch) {
  if(scalars.includes(branch.type)) {
    return resolveScalar(branch);
  }

  return resolveVector(branch);
}
const buildVis = function(name, index, array) {
 return index !== 0 && `${array[index-1]} -> ${name}`
}

const analyzeCombination = function(combination) {
  return combination.suites
    .map(resolveTypes)
    .map(buildVis)
    .filter(Boolean);
}

const analyzeMatrix = function(combinations) {
  const analyticsMap = combinations.map(combination => {
    return combination.map(resolveTypes);
  }).map(combination => {
    return combination.map((name, index, array) => {
      if(index === 0) return null;
      return `${array[index-1]} -> ${name}`
    }).filter(Boolean)
  })

  return union(...analyticsMap)
};

export default analyzeMatrix

export {
  analyzeCombination,
}
