"use strict";

const wd = require("wd");
const cap = require('../cap');
const logging = require("../lib/logging");
const delay = require('../lib/util/delay');

const Appium = require('../lib/Appium');

const driver = wd.promiseChainRemote(cap.local);

const reflow = new Appium(driver);

// describe("ios", function () {
//   this.timeout(300000);
//   let driver;
//   let sessionID;

//   before(async function () {
//     await reflow.init({
//       remote: cap.local,
//       cap: cap.ios,
//     });
//   });

//   after(function () {
//     // return reflow.quit();
//   });

//   it('sdas', async function() {
//     const sessionID = await reflow.fetchSessionID();
//     console.log('sessionID::', sessionID);
//     const source = await reflow.getSource()
//     console.log('source::', source)
//     await reflow.execute(null, 'swipe', [0, 100, 200, 100]);
//   })
// });


describe("android", function () {
  this.timeout(300000);
  let driver;
  let sessionID;

  before(async function () {
    await reflow.init({
      cap: cap.android,
    });
  });

  after(function () {
    // return reflow.quit();
  });

  it('sdas', async function() {
    const sessionID = await reflow.fetchSessionID();
    console.log('sessionID::', sessionID);
    const source = await reflow.getSource()
    console.log('source::', source)
    await reflow.execute(null, 'swipe', [0, 100, 200, 100]);
  })
});
