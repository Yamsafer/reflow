const Appium = require('../');
const path = require('path');

(async function() {
  const appiumInstance = new Appium();
  try {
    await appiumInstance.connect({
      throwInsteadOfExit: true,
      loglevel: 'debug',
      nodeconfig: require.resolve(path.join(__dirname, './node1.json')),
      port: '2723',
      host: "localhost",
    });
  } catch(err) {
    console.log('Error connecting appium to hub.')
    console.error(err)
  }
})()
