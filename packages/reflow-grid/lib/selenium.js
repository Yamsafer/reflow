const selenium = require('selenium-standalone');
const util = require('util');
const installSeleniumAsync = util.promisify(selenium.install);
const startSeleniumAsync = util.promisify(selenium.start);

const SELENIUM_VERSION = '3.11.0';
// const SELENIUM_VERSION = '3.0.1';
const DRIVERS = {
  // firefox: {
  //   version: '0.20.0',
  //   arch: process.arch,
  //   baseURL: 'https://github.com/mozilla/geckodriver/releases/download',
  // },
  chrome: {
    // check for more recent versions of chrome driver here:
    // https://chromedriver.storage.googleapis.com/index.html
    version: '2.37',
    arch: process.arch,
    baseURL: 'https://chromedriver.storage.googleapis.com',
  },
  // ie: {
  //   // check for more recent versions of internet explorer driver here:
  //   // https://selenium-release.storage.googleapis.com/index.html
  //   version: '3.9',
  //   arch: process.arch,
  //   baseURL: 'https://selenium-release.storage.googleapis.com',
  // },
};

const installSelenium = function(opts={}) {
  let lastPercentage;
  return installSeleniumAsync({
    // check for more recent versions of selenium here:
    // https://selenium-release.storage.googleapis.com/index.html
    version: SELENIUM_VERSION,
    baseURL: 'https://selenium-release.storage.googleapis.com',
    drivers: DRIVERS,
    proxy: opts.proxy, // see https://github.com/request/request#proxies
    requestOpts: { // see https://github.com/request/request#requestoptions-callback
      timeout: 15000
    },
    logger: function(message) {
      if(typeof message === 'string') {
        message.split('\n').forEach(line => {
          console.log('[Selenium Hub] ', line);
        })
        return;
      }
      console.log('[Selenium Hub] -> Start');
      console.log(message)
      console.log('[Selenium Hub] <- End');
    },
    progressCb: (totalLength, progressLength, chunkLength) => {
      const currentPercentage = Math.round(progressLength/totalLength*100);
      if(lastPercentage === currentPercentage) return;
      lastPercentage = currentPercentage;
      console.log(`[Selenium Hub] Installing ${currentPercentage}%`);
    },
  });
}

const startSelenium = function(opts = {}) {
  const seleniumArgs = opts.seleniumArgs || [];
  return startSeleniumAsync({
    version: SELENIUM_VERSION,
    drivers: DRIVERS,
    spawnOptions: {
      stdio: 'inherit'
    },
    seleniumArgs: ["-role", "hub", ...seleniumArgs],
  });
}

module.exports = {
  install: installSelenium,
  start: startSelenium,
}
