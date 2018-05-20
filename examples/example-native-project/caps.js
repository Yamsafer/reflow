const path = require('path');
const ROOTPATH = process.cwd();
// const iosAppPath = path.resolve(ROOTPATH, './app/Yamsafer.ipa');
const iosAppPath = '/Users/Bamieh/Bamieh/yamsafer-ios/build/Yamsafer.ipa';

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

const iphoneBase = {
  "appium-version": "1.7",
  "platform": "iOS",
  "automationName": "XCUITest",
  "showIOSLog": true,
  "autoAcceptAlerts": true,
  "xcodeOrgId": "YUC5LW8F44",
  "xcodeSigningId": "Yamsafer Inc",
  "app": iosAppPath,
}

const iphone6 = Object.assign({}, iphoneBase, {
  "browserName": "iPhone (11.1.1)",
  "version": "11.1.1",
  "deviceName": "iPhone (11.1.1)",
  "udid": "6f0b5ad21cff5f3be9fa1a8b5c25ec1614bf1ffa",
  "wdaLocalPort": 8100,
})

const iphone11 = Object.assign({}, iphoneBase, {
  "browserName": "iPhone (11.2.6)",
  "version": "11.2",
  "deviceName": "iPhone (11.2.6)",
  "udid": "e7297f0869902daebdddabfc4b696bd86cf27d45",
  "wdaLocalPort": 8101,
});

const localHub = {
  host: 'localhost',
  port: 3000,
};

const remoteHub = {
  host: 'automation.yamsafer.com',
  port: 4444,
};

module.exports = {
  connection: remoteHub,
  devices: [
    // iphone11,
    iphone6,
  ],
}

  // "browserName": "iPhone 11.2.6",
  // "appium-version": "1.7",
  // "platform": "iOS",
  // "automationName": "XCUITest",
  // "version": "11.2",
  // "deviceName": "iPhone 11.2.6",
  // "udid": "e7297f0869902daebdddabfc4b696bd86cf27d45",
  // "showIOSLog": true,
  // // "usePrebuiltWDA": true,
  // // "updatedWDABundleId": "com.yamsafer.DriverAgentRunner",
  // // "updatedWDABundleId": "com.facebook.wda.integrationApp",
  // // "bundleId": "com.yamsafer.yamsafer",
  // "autoAcceptAlerts": true,
  // // "xcodeOrgId": "P9E7GB692S",
  // "xcodeOrgId": "YUC5LW8F44",
  // // "xcodeSigningId": "iPhone Developer",
  // "xcodeSigningId": "Yamsafer Inc",
  // // "xcodeSigningId": "iPhone Developer: Yamsafer Inc (P9E7GB692S)",
