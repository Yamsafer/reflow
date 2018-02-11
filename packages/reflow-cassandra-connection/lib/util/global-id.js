const Buffer = require('buffer').Buffer;

function encode(type, id) {
  return new Buffer(`${type}_${id}`).toString('base64');
}

function decode(globalID) {
  try {
    const [type, id] = Buffer.from(globalID, 'base64').toString('utf8').split('_');
    return { id, type }
  } catch(e) {
    return {}
  }
}

module.exports = {encode, decode};
