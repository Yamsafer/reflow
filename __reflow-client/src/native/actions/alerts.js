const delay = require('../util/delay');

// while(findElements("//*[@class='android.widget.Button'][2]"))
//   //allow
// while(findElements("//*[@class='android.widget.Button'][1]"))
//   //deny


module.exports = function({driver}) {
  async function acceptAll() {
    let alert = await driver.elementOrNull("xpath", "//XCUIElementTypeAlert");
    while(alert) {
      console.log('Found An Alert!');
      await driver.execute('mobile: alert', { 'action': 'accept' });
      await delay(300);
      alert = await driver.elementOrNull("xpath", "//XCUIElementTypeAlert");
    }
    console.log('No More Alerts.')
  };

  function accept() {
    return driver.execute('mobile: alert', {
      'action': 'accept',
      // 'buttonLabel': 'My Cool Alert Button',
    });
  }
  return {
    accept,
    acceptAll,
  }
}
// module.exports = function(driver) {
//   if (driver.findElementByXPath("//XCUIElementTypeAlert[1]").isDisplayed()) {
//     console.info("Alert is present");
//     WebDriverWait wait = new WebDriverWait(driver, 200);
//     wait.until(alertIsPresent());
//     driver.switchTo().alert().accept();

//   } else {
//     console.info("Alert is not present");
//   }
// }
