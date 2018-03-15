let elVariableCounter = 1;
let elArrayVariableCounter = 1;

module.exports.elementCache = {};

module.exports.variableCounter = () => {
  return elVariableCounter
}

module.exports.arrayVariableCounter = () => {
  return elArrayVariableCounter;
}

module.exports.incArrayVariableCounter = () => {
  return elArrayVariableCounter++;
}

module.exports.incVariableCounter = () => {
  return elVariableCounter++;
}
