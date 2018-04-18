async function acceptAll() {
  console.log('this:::::', this)
  let alert = await this.driver.elementOrNull("xpath", "//XCUIElementTypeAlert");
  while(alert) {
    console.log('Found An Alert!');
    await driver.execute('mobile: alert', { 'action': 'accept' });
    await this.utils.delay(300);
    alert = await driver.elementOrNull("xpath", "//XCUIElementTypeAlert");
  }
  console.log('No More Alerts.')
}

module.exports = acceptAll;
