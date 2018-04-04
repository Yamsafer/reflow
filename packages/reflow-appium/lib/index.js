const appium = require("appium/build/lib/main").main;

class Appium {
  constructor(config) {
    this.server = null;
  }
  async connect(config) {
    try {
      this.server = await appium(config);
      return 'Appium server is launched.';
    } catch(err) {
      throw {
        description: 'Appium server isn\'t launched successfully.',
        message: err.message,
      };
    }
  }
  async stop() {
    if(!this.server) throw 'Appium server is not launched.';
    try {
      await this.server.close();
      this.server = null;
      console.log(`Appium server stopped.`);
    } catch(err) {
      throw {
        description: 'Appium server isn\'t stopped successfully.',
        message: err.message,
      };
    }
  }
}

module.exports = Appium
