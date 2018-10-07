/// <reference path="typings/globals.d.ts" />

import * as chai from 'chai';
import * as sinon from 'sinon'
import * as sinonChai from 'sinon-chai'

chai.use(sinonChai)

global.expect = chai.expect
global.sinon = sinon
