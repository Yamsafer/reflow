/// <reference path="typings/globals.d.ts" />

import {connectClient} from './connect';

describe.only('Reflow|Client', function() {
  let client: any;
  before(async function() {
    client = await connectClient();
  })
  it("returns an initialized client", function() {
    expect(client).to.be.an("object");
  });
  it("exposes flow variables", function() {
    expect(client.flow).to.be.an("object")
  })
  it("exposes logger", function() {
    expect(client.logger).to.not.be.an("undefined");
  });
  it("exposes teardown", function() {
    expect(client.teardown).to.be.a('function');
  })
  after(function() {
    if(!client) console.log('No Client.');
    console.log('Shutting down');
    return client.teardown()
  })
})
