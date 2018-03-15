async function execute (elementId, methodName, args, skipScreenshotAndSource) {
  let cachedEl;
  let res = {};

  if (elementId) {
    // Give the cached element a variable name (el1, el2, el3,...) the first time it's used
    cachedEl = this.elementCache[elementId];
    if (!cachedEl.variableName && cachedEl.variableType === 'string') {
      cachedEl.variableName = `el${this.elVariableCounter++}`;
    }
    res = await cachedEl.el[methodName].apply(cachedEl.el, args);
  } else {
     // Specially handle the tap and swipe method
    if (methodName === 'tap') {
      res = await (new wd.TouchAction(this.driver))
        .tap({x: args[0], y: args[1]})
        .perform();
    } else if (methodName === 'swipe') {
      const [startX, startY, endX, endY]  = args;
      res = await (new wd.TouchAction(this.driver))
        .press({x: startX, y: startY})
        .moveTo({x: endX, y: endY})
        .release()
        .perform();
    } else if (methodName !== 'source' && methodName !== 'screenshot') {
      res = await this.driver[methodName].apply(this.driver, args);
    }
  }

  // Give the source/screenshot time to change before taking the screenshot
  await Bluebird.delay(500);

  let sourceAndScreenshot;
  if (!skipScreenshotAndSource) {
    sourceAndScreenshot = await this._getSourceAndScreenshot();
  }

  return {
    ...sourceAndScreenshot,
    ...cachedEl,
    res,
  };
}

module.exports = executeElementCommand (elementId, methodName, args = [], skipScreenshotAndSource = false) {
  return execute(elementId, methodName, args, skipScreenshotAndSource);
}
