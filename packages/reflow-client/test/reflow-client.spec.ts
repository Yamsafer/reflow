/// <reference path="typings/globals.d.ts" />

import {reflowClient} from '../src/reflow-client';
import {clientConfig} from './connect';

describe('reflowClient', function() {
  let client: any;
  it("works", function() {
    client = reflowClient(clientConfig);
    {client}
  })
})
