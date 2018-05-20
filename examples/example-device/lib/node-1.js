const Appium = require('reflow-appium');
const path = require('path');
const nodeconfig = require.resolve(path.join(__dirname, './devices/iphone6.json'));

(async function() {
  const appiumInstance = new Appium();
  try {
    await appiumInstance.connect({
      throwInsteadOfExit: true,
      loglevel: 'debug',
      port: '2723',
      host: "localhost",
      nodeconfig,
    });
  } catch(err) {
    console.log('Error connecting appium to hub.')
    console.error(err)
  }
})()
