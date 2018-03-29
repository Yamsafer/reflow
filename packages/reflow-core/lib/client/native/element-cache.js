class ElementCache {
  constructor() {
    console.log('Creating new Caching Instance.');
    this.reset();
  }
  reset() {
    this.variableCounter = 1;
    this.arrayVariableCounter = 1;
    this.element = {};
  }
}

module.exports = ElementCache;
