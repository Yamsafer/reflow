const android5 = {
  browserName: '',
  'appium-version': '1.7',
  platformName: 'Android',
  platformVersion: '5.1',
  deviceName: 'Android',
  automationName: 'UiAutomator2',
  // automationName: 'Espresso',
  app: 'app/yma.apk',
};

const path = require('path');
const ROOTPATH = process.cwd();
const iosAppPath = path.resolve(ROOTPATH, './app/Yamsafer.ipa');

const iphone11 = {
  browserName: '',
  'appium-version': '1.7',
  platformName: 'iOS',
  platformVersion: '11.2',
  deviceName: 'iPhone (11.2.6)', // iphone 9.3
  app: iosAppPath,
  // iosInstallPause: 8000,
  // useCarthageSsl: true,
  usePrebuiltWDA: true,
  // xcodeConfigFile: 'app/.xcconfig',
  showIOSLog: true,

  // waitForQuiescence: false,
  // updatedWDABundleId: 'com.yamsafer.drive',
  updatedWDABundleId: 'com.yamsafer.DriverAgentRunner',
  udid: 'e7297f0869902daebdddabfc4b696bd86cf27d45',
  bundleId: 'com.yamsafer.yamsafer',
  autoAcceptAlerts: true,
  xcodeOrgId: "YUC5LW8F44",
  xcodeSigningId: "Yamsafer Inc",

  // name: 'Yamsafer ios App',
  // tags: ['some tag'],
};
const options = {
  connection: {
    ci: {
      host: 'kepler.yamsafer.me',
      port: 4723,
    },
    local: {
      host: 'localhost',
      port: 4444,
      // port: 3000,
    },
  },
  android: {
    native: {
      android5,
    },
  },
  ios: {
    native: {
      iphone11,
    },
    simulator: {

    },
  },
};

module.exports = {
  connection: options.connection.local,
  devices: [
    options.ios.native.iphone11,
  ],
}
