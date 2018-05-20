const acceptAll = function acceptAll(client) {
  return async function() {
    const {driver, actions} = client;
    console.log('actions::', actions)
    await actions.delay(500);

    let alert = await driver.elementOrNull("xpath", "//XCUIElementTypeAlert");
    console.log('alert::', alert)
    while(alert) {
      console.log('Found An Alert!');
      await driver.execute('mobile: alert', { 'action': 'accept' });
      await actions.delay(300);
      alert = await driver.elementOrNull("xpath", "//XCUIElementTypeAlert");
    }
    console.log('No More Alerts.')
  }
};

module.exports = acceptAll