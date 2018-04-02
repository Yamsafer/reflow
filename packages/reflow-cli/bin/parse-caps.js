module.exports = function(capsPath) {
  try {
    return require(capsPath);
  } catch(e) {
    return {};
  }
}
