const { getDevices } = require('reflow-appium');

(async function() {
  try {
    console.log('Fetching Devices:')
    const devices = await getDevices();
    console.log('Got Devices:')
    console.log(JSON.stringify(devices, 2, 2));
  } catch(err) {
    console.error(err)
  }
})()
