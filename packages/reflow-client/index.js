
const {
  ClientConfig,
  RemoteOptions,
  createClient,
} = require('./lib');

console.log('RemoteOptions::', RemoteOptions)

// const {
//   remote,
//   RemoteOptions,
// } = require('webdriverio');

const getLogger = require('@wdio/logger').default
const getLogger2 = require('@wdio/logger').default


const a = getLogger('a')
a.debug('aa')
