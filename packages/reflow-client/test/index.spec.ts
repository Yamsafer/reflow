import {
  createClient,
  ClientConfig,
} from '../src/index';

describe('Reflow|Client', function() {
  let client;
  it("creates a reflow client", function() {
    const clientConfig:ClientConfig = {

    }
    client = createClient(clientConfig);
    console.log('client::', client)
  });
})
