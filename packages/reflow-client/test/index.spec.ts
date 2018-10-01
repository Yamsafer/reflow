/// <reference path="typings/globals.d.ts" />

import {connectClient} from './connect';
import * as flowVariables from '../src/commands/flow-variables'

describe.only('Reflow|Client', function() {
  let client: any;
  before(async function() {
    client = await connectClient();
  })
  it("returns initialized client", async function() {
    expect(client).to.be.an("object");
    const d = await client.getGridNodeDetails();
    console.log('d::', d)
  });
  it("appends flow variables", function() {
    const flowMethods = Object.keys(flowVariables);
    expect(client.flow).to.have.all.keys(flowMethods);
  })
  after(function() {
    if(!client) console.log('No Client.');
    console.log('Shutting down');
    return client.deleteSession()
  })
})
