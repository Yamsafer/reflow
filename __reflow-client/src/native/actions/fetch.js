async function fetchElement (strategy, selector) {
  let element = await this.driver.elementOrNull(strategy, selector);
  if (element === null) {
    return {};
  }
  let id = element.value;

  // Cache this ID along with its variable name, variable type and strategy/selector
  let cachedEl = this.cache.element[id] = {
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

async function fetchElements (strategy, selector) {
  const els = await this.driver.elements(strategy, selector);

  const variableName = `els${this.cache.arrayVariableCounter++}`;
  const variableType = 'array';

  // Cache the elements that we find
  const elements = els.map((el, index) => {
    const res = {
      el,
      variableName,
      variableIndex: index,
      variableType: 'string',
      id: el.value,
      strategy,
      selector,
    };
    this.cache.element[el.value] = res;
    return res;
  });

  return {variableName, variableType, strategy, selector, elements};
}



module.exports = {
  elements: fetchElements,
  element: fetchElement,
}
