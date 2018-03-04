var driver;
var allPassed = true;

const config = require('./config');
before(function () {
  var serverConfig = config.local;
  driver = wd.promiseChainRemote(config.local);
  require("./helpers/logging").configure(driver);

  var desired = _.clone(config.android19);

  desired.app = require("./helpers/apps").androidApiDemos;

  return driver
    .init(desired)
    .setImplicitWaitTimeout(5000);
});

after(function () {
  return driver
    .quit()
    .finally(function () {
      if (process.env.npm_package_config_sauce) {
        return driver.sauceJobStatus(allPassed);
      }
    });
});