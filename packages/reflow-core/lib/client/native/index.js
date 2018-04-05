"use strict";

const wd = require("wd");

const logging = require("./logging");
// const delay = require('./util/delay');
const praseDir = require('../../utils/parse-dir');
const ElementCache = require('./element-cache');

class NativeClient {
  constructor(driver) {
    console.log('Creating Appium Instance.');

    this.capability = null;
    this.sessionID = null;
    this.driver = driver;
    this.cache = new ElementCache();

    // this.alerts = require('./actions/alerts')({
    //   driver: this.driver,
    //   cache: this.cache,
    // });

    console.log('Binding Custom Actions.');
    console.log('Done.');
  }

  async init({capability, customActions, delayDuration = 500} = {}) {
    console.log('customActions:!!', customActions)

    const customActionsObj = praseDir(customActions, {
      visit: action => action(this),
    });

    console.log('customActionsObj:!!', customActionsObj)
    Object.entries(customActionsObj).forEach(([key, value]) => {
      this[key] = value;
    })

    console.log('this:!!', this)
    this.capability = capability;

    console.info('Configuring Logger.')
    logging.configure(this.driver);

    console.info('Initializing Driver.')
    console.info(`Cap: ${this.capability.deviceName}.`);
    await this.driver.init(this.capability);
    await this.delay(delayDuration);
    try {

      if(this.capability.autoAcceptAlerts) {
        console.log('Auto Accepting Alerts. Polling...')
        await this.alerts.acceptAll();
      }
    } catch(err) {
      console.error('error initalizing client, rolling back..')
      await this.teardown();
      throw {
        description: 'Error Initializing Client',
        message: err.message,
      }
    }
    console.log('Done.')
  }
  teardown() {
    return this.driver
      .quit()
      .finally(function () {
        console.log('Driver Teardown Complete.');
      });
  }
}

module.exports = NativeClient;
