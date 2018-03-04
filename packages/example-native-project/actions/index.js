const wd = require('wd');
module.exports = {
  pinch: require('./pinch')(wd),
  swipe: require('./swipe')(wd),
  zoom: require('./zoom')(wd),
}
