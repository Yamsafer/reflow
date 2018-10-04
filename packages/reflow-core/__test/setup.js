process.env.NODE_ENV = 'test';

import chai from 'chai';
import spies from 'chai-spies';
import chaiAsPromised from 'chai-as-promised'

chai.use(spies);
chai.use(chaiAsPromised);

global.chai = chai;
global.expect = chai.expect;