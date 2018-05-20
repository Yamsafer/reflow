const delay = require('../delay');
const wd = require('wd');

async function getSourceAndScreenshot (driver) {
  let source, sourceError, screenshot, screenshotError;
  try {
    source = await driver.source();
  } catch (e) {
    if (e.status === 6) {
      throw e;
    }
    sourceError = e;
  }

  try {
    screenshot = await driver.takeScreenshot();
  } catch (e) {
    if (e.status === 6) {
      throw e;
    }
    screenshotError = e;
  }

  return {source, sourceError, screenshot, screenshotError};
}

async function _execute (elementId, methodName, args = [], skipScreenshotAndSource = false) {
  let cachedEl;
  let res = {};

  if (elementId) {
    // Give the cached element a variable name (el1, el2, el3,...) the first time it's used
    cachedEl = this.cache.element[elementId];
    if (!cachedEl.variableName && cachedEl.variableType === 'string') {
      cachedEl.variableName = `el${this.cache.variableCounter++}`;
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
  await delay(500);

  let sourceAndScreenshot;
  if (!skipScreenshotAndSource) {
    sourceAndScreenshot = await getSourceAndScreenshot();
  }

  return Object.assign({},
    sourceAndScreenshot,
    cachedEl,
    { res, }
  );
}



module.exports = () => {
  const elementCommand = function elementCommand(elementId, methodName, args = [], skipScreenshotAndSource = false) {
    return _execute.call(this, {elementId, methodName, args, skipScreenshotAndSource});
  }
  const method = function method (methodName, args = [], skipScreenshotAndSource = false) {
    return _execute.call(this, {methodName, args, skipScreenshotAndSource});
  }
}
