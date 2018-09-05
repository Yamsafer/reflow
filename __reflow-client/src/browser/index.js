"use strict";

const wd = require("wd");

const logging = require("./logging");
// const delay = require('./util/delay');
const praseDir = require('../../utils/parse-dir');
const ElementCache = require('./element-cache');
const baseClient = require('../base');

const buildActions = (customActionsPath) => {
  console.log('Setting actions..');
  const reflowActions = {};
  console.log('Parsing Custom Actions..');
  const customActions = praseDir(customActionsPath, {
    visit: action => action({
      driver: this.driver,
      cache: this.cache,
      actions,
    }),
  });
  console.log('Setting custom Actions: ', Object.keys(actions));
  return Object.assign({}, reflowActions, customActions);
}
const browserClient = (driver) => ({
  baseClient(driver),
  actions(),
})


class Base {
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

    console.log('Done.');
  }

  async init({capability, customActions, delayDuration = 500} = {}) {

    this.capability = capability;
    const actions = {};
    console.log('Parsing Custom Actions');
    Object.assign(actions, praseDir(customActions, {
      visit: action => action({
        capability: this.capability,
        driver: this.driver,
        cache: this.cache,
        actions,
      }),
    }));
    console.log('Setting custom Actions: ', Object.keys(actions));

    Object.entries(actions).forEach(([name, action]) => {
      this[name] = action;
    })

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


const createClient = () => {}

module.exports = createClient
