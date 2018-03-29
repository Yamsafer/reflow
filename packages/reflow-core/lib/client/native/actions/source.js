function getSource() {
  return this.driver.source();
}

module.exports = {
  get: getSource,
}
