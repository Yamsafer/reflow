/// <reference path="typings/caps.d.ts" />
import * as capabilities from './fixture/caps.json';

import {
  createClient,
  ClientConfig,
} from '../src/index';

describe('Reflow|Client', function() {
  let client;
  before(function() {
    const clientConfig:ClientConfig = {
      capabilities,
    };
    client = createClient(clientConfig);
    console.log('client::', client)
  })
  it("sda", function() {

  });
})
