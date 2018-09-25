import { Base, BaseClientConfig } from '../base'

export
interface NativeClientConfig extends BaseClientConfig {}

export
class Native extends Base {
  async init() {
    await super.init();
    try {
      if(this.capability.autoAcceptAlerts) {
        console.log('Auto Accepting Alerts. Polling...')
        await this.actions.alerts.acceptAll();
      }
    } catch(err) {
      console.error('error initalizing client, rolling back..')
      await this.teardown();
      throw {
        description: 'Error Initializing Client',
        message: err.message,
      }
    }
  }
}

