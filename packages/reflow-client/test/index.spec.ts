/// <reference path="typings/globals.d.ts" />

import {connectClient} from './connect';
import * as flowVariables from '../src/commands/flow-variables'

describe('Reflow|Client', function() {
  let client: any;
  before(async function() {
    client = await connectClient();
  })
  it("returns an initialized client", function() {
    expect(client).to.be.an("object");
    // const log = client.emit('log', 'Before my method')
  });
  it("appends flow variables", function() {
    const flowMethods = Object.keys(flowVariables);
    expect(client.flow).to.have.all.keys(flowMethods);
  })
  // it("appends logger", function() {
  //   console.log('client::', client)
  // })
  after(function() {
    if(!client) console.log('No Client.');
    console.log('Shutting down');
    return client.deleteSession()
  })
})
