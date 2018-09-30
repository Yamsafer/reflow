/// <reference path="typings/globals.d.ts" />

import {connectClient} from './connect';
import * as flowVariables from '../src/commands/flow-variables'

describe('Reflow|Client', function() {
  let client: any;
  before(async function() {
    client = await connectClient();
  })
  it("returns initialized client", async function() {
    expect(client).to.have.properties([''])
    console.log('client::', client)
  });
  it("appends flow variables", function() {
    const flowMethods = Object.keys(flowVariables);
    expect(client.flow).to.have.properties(flowMethods);
  })
  after(function() {
    if(!client) console.log('No Client.');

    console.log('Shutting down');
    return client.deleteSession()
  })
})
