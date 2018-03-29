import supertest from 'supertest';

import chai from 'chai';
import spies from 'chai-spies';
import chaiAsPromised from 'chai-as-promised';
import wd from 'wd';

chai.use(spies);
chai.use(chaiAsPromised);
chaiAsPromised.transferPromiseness = wd.transferPromiseness;

global.request = supertest;
global.chai = chai;
global.expect = chai.expect;
