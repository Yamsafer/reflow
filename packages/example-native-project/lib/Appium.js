"use strict";

const wd = require("wd");
const cap = require('../cap');
const logging = require("../lib/logging");
const delay = require('./util/delay');

const execute = require('./actions/execute');
const source = require('./actions/source');
const alerts = require('./actions/alerts');
const session = require('./actions/session');

const NativeActions = require('./actions');

let driver;
let sessionID;

class ElementCache {
  constructor() {
    console.log('Creating new Caching Instance.');
    this.reset();
  }
  reset() {
    this.variableCounter = 1;
    this.arrayVariableCounter = 1;
    this.element = {};
  }
}

class Appium extends NativeActions {
  constructor(driver) {
    console.log('Creating Appium Instance.');
    super();

    this.cap = null;
    this.sessionID = null;
    this.driver = driver;

    this.cache = new ElementCache();
    // console.log('Binding Native Actions.');

    this.execute = execute.bind(this);
    this.getSource = source.bind(this);
    this.acceptAllAlerts = alerts.acceptAll.bind(this);
    this.fetchSessionID = session.fetch.bind(this);

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
      await this.acceptAllAlerts();
    }
    console.log('Done.')
  }
  async fetchSessionID() {
    console.info('Fetching session ID');
    this.sessionID = await this.driver.getSessionId();
    return this.sessionID;
  }
  quit() {
    return this.driver
      .quit()
      .finally(function () {
        console.log('Driver Teardown Complete.');
      });
  }
}

module.exports = Appium;
