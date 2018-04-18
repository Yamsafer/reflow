function accept() {
  return this.driver.execute('mobile: alert', {
    'action': 'accept',
  });
}

module.exports = accept;
