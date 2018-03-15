exports.android19 = {
  browserName: '',
  'appium-version': '1.7',
  platformName: 'Android',
  platformVersion: '5.1',
  deviceName: 'Android Emulator',
  app: 'app/yma.apk',
};

exports.ios = {
  browserName: '',
  'appium-version': '1.7',
  platformName: 'iOS',
  platformVersion: '11.2',
  deviceName: 'iPhone (11.2.6)', // iphone 9.3
  app: 'app/Build/Yamsafer.ipa',
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
  // autoAcceptAlerts: true,
  xcodeOrgId: "YUC5LW8F44",
  xcodeSigningId: "Yamsafer Inc",

  // name: 'Yamsafer ios App',
  // tags: ['some tag'],
};

exports.local = {
  host: 'localhost',
  port: 4723
};
