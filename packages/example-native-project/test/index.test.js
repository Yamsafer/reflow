"use strict";

const wd = require("wd");
const cap = require('../cap');
const logging = require("../lib/logging");
const delay = require('../lib/util/delay');

describe("ios complex", function () {
  this.timeout(300000);
  let driver;
  let sessionID;

  before(async function () {
    console.log('starting')
    driver = await wd.promiseChainRemote(cap.local);

    console.log('configuring logger')
    logging.configure(driver);

    try {
      console.log('initializing')
      await driver.init(cap.ios);
    } catch(err) {
      console.error('Error initializing:', err)
    }
    console.log('getting session ID')

    sessionID = await driver.getSessionId();
    console.log('sessionID', sessionID)
  });

  after(function () {
    // return driver
    //   .quit()
    //   .finally(function () {
    //     console.log('finitto');
    //   });
  });

  it('sdas', async function() {
    // console.log('driver:::', driver)

    // const source = await driver.source();
    // console.log('source:::', source)

    // let elements = await driver.elements("xpath", "//XCUIElementTypeAlert");

    const allow = await driver.elementOrNull("id", "Allow");
    console.log('allow::', allow);
    if(allow) {
      await allow.click();
    }

    await delay(500)

    const alwaysAllow = await driver.elementOrNull("id", "Always Allow");
    console.log('alwaysAllow::', alwaysAllow);
    if(alwaysAllow) {
      await alwaysAllow.click();
    }



//     console.log('element::', findElement('//XCUIElementTypeAlert//XCUIElementTypeButton[@name="Always Allow"]').length);
// console.log('element::', findElement('//XCUIElementTypeAlert//XCUIElementTypeButton[@name="Allow"]').length);



    // let children = await driver.elements("xpath", "//XCUIElementTypeAlert[*]");
    // console.log('children:::', children);

    // console.log('driverMethods:', Object.keys(driver));

    // await driver.executeScript('mobile: alert', {'action': 'accept', 'buttonLabel': 'My Cool Alert Button'});
    // let alerts = await driver.elements("xpath", "//XCUIElementTypeAlert[1]");
    // while(alert) {
    //   console.log('Found Popup Notification!');
    //   // const isEnabled = await alert.isEnabled();
    //   // console.log('isEnabled::', isEnabled)
    //   console.log('Clicking alert')
    //   await alert.click();
    //   alert = await driver.element("xpath", "//XCUIElementTypeAlert[1]");
    // }





    // if (driver.findElementByXPath("//XCUIElementTypeAlert[1]").isDisplayed()) {
    //   console.info("Alert is present");
    //   WebDriverWait wait = new WebDriverWait(driver, 200);
    //   wait.until(alertIsPresent());
    //   driver.switchTo().alert().accept();
    // } else {
    //   console.info("Alert is not present");
    // }
  })
});
