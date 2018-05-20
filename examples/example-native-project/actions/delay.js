module.exports = function() {
  return (delay) => new Promise(resolve => setTimeout(resolve, delay));
}
