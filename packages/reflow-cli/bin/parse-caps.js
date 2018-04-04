const path = require('path');
let ROOTPATH;
module.exports = function(capsPath) {
  ROOTPATH = ROOTPATH || process.cwd();
  try {
    const completePath = path.resolve(ROOTPATH, capsPath);
    return require(completePath);
  } catch(err) {
    console.error('Error parsing Caps: ', err)
    console.log('Using default Caps.');
    return {
      connection: {},
      devices: [],
    };
  }
}
