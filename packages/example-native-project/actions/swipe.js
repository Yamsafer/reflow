"use strict";

const wd = require('wd');
const Q = require('q');

exports.swipe = function (wd) {
  return ({startX, startY, endX, endY, duration}) => {
    const action = new wd.TouchAction();
    action
      .press({x: startX, y: startY})
      .wait(duration)
      .moveTo({x: endX, y: endY})
      .release();
    return this.performTouchAction(action);
  }
};
