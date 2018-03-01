const chai = require('chai');
const wd = require('wd');
const chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);


chaiAsPromised.transferPromiseness = wd.transferPromiseness;

global.chai = chai;
global.expect = chai.expect;
