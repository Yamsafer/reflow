"use strict";

const wd = require("wd");

const logging = require("./logging");
const delay = require('./util/delay');

const NativeActions = require('./actions');

const ElementCache = require('./element-cache');

class NativeClient extends NativeActions {
  constructor(driver) {
    console.log('Creating Appium Instance.');
    super();

    this.cap = null;
    this.sessionID = null;
    this.driver = driver;
    this.cache = new ElementCache();

    console.log('Binding Custom Actions.');
    console.log('Done.');
  }

  async init({cap, delayDuration = 500} = {}) {
    this.cap = cap;

    console.info('Configuring Logger.')
    logging.configure(this.driver);

    console.info('Initializing Driver.')
    console.info(`Cap: ${this.cap.platformName}.`);
    await this.driver.init(this.cap);
    await delay(delayDuration);
    if(this.cap.autoAcceptAlerts) {
      console.log('Auto Accepting Alerts. Polling...')
      await this.alerts.acceptAll();
    }
    console.log('Done.')
  }
  quit() {
    return this.driver
      .quit()
      .finally(function () {
        console.log('Driver Teardown Complete.');
      });
  }
}

module.exports = NativeClient;
