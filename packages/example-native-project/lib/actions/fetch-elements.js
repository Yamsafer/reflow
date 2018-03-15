let elArrayVariableCounter = 1;

module.exports = function(driver, elementCache) {
  return async fetchElements (strategy, selector) {
    let els = await driver.elements(strategy, selector);

    let variableName = `els${elArrayVariableCounter++}`;
    let variableType = 'array';

    // Cache the elements that we find
    let elements = els.map((el, index) => {
      const res = {
        el,
        variableName,
        variableIndex: index,
        variableType: 'string',
        id: el.value,
        strategy,
        selector,
      };
      elementCache[el.value] = res;
      return res;
    });

    return {variableName, variableType, strategy, selector, elements};
  }
}

