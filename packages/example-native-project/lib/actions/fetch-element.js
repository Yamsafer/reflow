module.exports = function(driver, elementCache) {
  return async fetchElement (strategy, selector) {
    let element = await driver.elementOrNull(strategy, selector);
    if (element === null) {
      return {};
    }
    let id = element.value;

    // Cache this ID along with its variable name, variable type and strategy/selector
    let cachedEl = elementCache[id] = {
      el: element,
      variableType: 'string',
      strategy,
      selector,
      id,
    };

    return {
      ...cachedEl,
      strategy,
      selector,
      id,
    };
  }
}
