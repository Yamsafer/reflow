const childProcess = require('child_process');
const util = require('util');
const execAsync = util.promisify(childProcess.exec);
const plist = require('plist');

async function systemProfiler(dataTypes) {

  const result = await execAsync('/usr/sbin/system_profiler -xml -detailLevel mini ' + dataTypes.join(' '));

  return plist.parse(result.stdout.toString()).reduce((acc, sec) => {
    return acc.concat({
      name: sec._dataType,
      items: sec._items[0],
      properties: sec._properties
    });
  }, []);
}


const adb = require('adbkit')
const client = adb.createClient()

function getAndroidFeatures(devices) {
  return Promise.all(
    devices
      .filter(device => device.type !== 'unauthorized')
      .map(device => {
        return client.getFeatures(device.id).then(features => {
          return {...device, features}
        });
    }));
}
function getAndroidProperties(devices) {
  return Promise.all(
    devices
      .filter(device => device.type !== 'unauthorized')
      .map(device => {
        return client.getProperties(device.id).then(properties => {
          return {...device, properties}
        });
    }));
}

const INSTRUMENTS_RE = /((.{0,})\((.{0,})\)\s{0,}\s\[(.{0,})])|(((.{0,})\((.{0,})\))(\s-*\s*(.*)))|((\w+ \w+ -)(\s-*\s*(.*)))|((\w*\s\-)(.*))/;
function extractDeviceDetails(line) {
  const match = line.match(INSTRUMENTS_RE);
  if(!match) return null;
  const uuid = match[4];
  const platformVersion = match[3];
  const deviceName = `${match[2]}${match[3]}`;
  return {
    line,
    uuid,
    platformVersion,
    deviceName,
  }
}
async function getIOSDevices() {
  console.log('Getting iOS Devices.');
  const result = await execAsync('xcrun instruments -s devices');
  const devices = result.stdout
    .split('\n')
    .filter(line => !/^(Known Devices:|)$/.test(line))

  const simulators = devices.filter(device => /\(Simulator\)/.test(device));
  const connected = devices.filter(device => !/\(Simulator\)/.test(device));

  return {
    simulators: simulators.map(extractDeviceDetails).filter(Boolean),
    realDevices: connected.map(extractDeviceDetails).filter(Boolean).filter(device => !device.uuid.includes('-')),
  }
}

async function getAndroidDevices() {
  console.log('Getting Android Devices.');

  return client.listDevices()
    .then(getAndroidFeatures)
    .then(getAndroidProperties)
  // const devices =  await client.listDevices();
  // console.log('devices::', devices)

  // const withFeatures = await getAndroidFeatures(devices);
  // const features = await getAndroidProperties(withFeatures);

  // console.log('features::', features)

  // const devices = result.stdout
  //   .split('\n')
  //   .filter(line => {
  //     return line !== '' && line !== 'List of devices attached'
  //   })
  //   .map(line => {
  //     console.log('line::', line)
  //     return /^(.+?)\s*?(.*)$/.match(line);
  //   })

  // const result = await execAsync('adb -t 2 shell getprop ro.build.version.release');
  // const result = await execAsync('adb -t 2 shell getprop ro.build.version.release');

}


function pluckDevices(dataTypes) {
  return dataTypes
    .find(dataType => dataType.name === 'SPUSBDataType')
    .items._items
    .filter(item => !!item.serial_num);
}
function addAppiumCaps(devices) {

}

async function getAllConnectedDevices() {
  console.log('Detecting devices.');
  return {
    android: await getAndroidDevices(),
    ios: await getIOSDevices(),
  }

  // return systemProfiler(['SPUSBDataType'])
  //   .then(pluckDevices)
  //   .then(addAppiumCaps);
}

const express = require('express');

module.exports = function() {
  const router = express.Router();

  router.get('/', async function(req, res) {
    try {
      res.status(200).json({
        android: await getAndroidDevices(),
        ios: await getIOSDevices(),
      });
    } catch(err) {
      console.error('Error getting devices: ', err);
      res.status(500).json({
        description: 'Error getting devices.',
        message: err.message,
      });
    }
  });

  router.get('/android', async function(req, res) {
    try {
      const androidDevices = await getAndroidDevices();
      res.status(200).json(androidDevices);
    } catch(err) {
      console.error('Error getting android devices: ', err);
      res.status(500).json({
        description: 'Error getting android devices.',
        message: err.message,
      });
    }
  });

  router.get('/ios', async function(req, res) {
    try {
      const iOSDevices = await getIOSDevices();
      res.status(200).json(iOSDevices);
    } catch(err) {
      console.error('Error getting iOS devices: ', err);
      res.status(500).json({
        description: 'Error getting iOS devices.',
        message: err.message,
      });
    }
  });

  return router;
}


