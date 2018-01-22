const Buffer = require('buffer').Buffer;
module.exports = (type, localID) => {
  return new Buffer(`${type}_${localID}`).toString('base64');
}
