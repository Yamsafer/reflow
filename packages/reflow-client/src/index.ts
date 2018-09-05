import wd from 'wd';
type clientConfig = any;

const chooseClient = (capability: any) => {
  if(capability.browserName) return import('./browser');
  if(/ios|android/i.test(capability.platform)) return import('./native');
}

async function createClient(driver: any, clientConfig: clientConfig) {
  const {
    capability,
    config,
    customActions,
  } = clientConfig;

  const Client = await chooseClient(capability);
  const client = new Client(driver, config);
  await client.init({ capability, customActions })
  return client;
}

export
function client(clientConfig: clientConfig) {
  const {connection} = clientConfig;
  if(!connection) return {};

  wd.configureHttp({
    retryDelay: 15,
    retries: 'never',
    timeout: 'default',
  });
  const driver = wd.promiseChainRemote(connection);
  return createClient(driver, clientConfig)
}
