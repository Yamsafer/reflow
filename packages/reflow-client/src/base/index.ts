import { flowVaribles } from './flow-variables'
import { pageObjectMixin, createPageObjects } from './page-objects'
import { createActions } from './actions';

import { createWinstonInstance, Logger, LoggerConfigs} from './logger';
import * as path from 'path';

export
interface BaseClientConfig {
  logger: LoggerConfigs,
}

const pageObjectGlob = path.join(process.cwd(), './page-objects/**/*.js')

export
class Base {
  public constructor(driver: any, config: BaseClientConfig) {
    this.singleton = {};
    this.driver = driver;
    this.config = config;
    this.actions = {};
    return new Proxy(this, {
      get(obj, prop) {
        const action = obj.actions[prop];
        if(action) return Reflect.get(action, prop, obj);

        return Reflect.get(obj, prop, obj);
      }
    })
  }

  private async init() {
    await this.driver.init();
    this.actions = await createActions(this, this.config.actions);
    this.pageObjects = createPageObjects(pageObjectGlob);
    this.logger = createWinstonInstance(this.config.logger),
  }

  protected teardown() {
    return this.driver
      .quit()
      .finally(() => console.log('Driver Teardown Complete.'));
  }

  private pageObjects: any;
  public logger: Logger;
  public driver: any;
  private singleton: object;
  private config: any;
  protected actions: any;
}

// copy the methods
Object.assign(Base.prototype,
  flowVaribles,
  pageObjectMixin,
);


/*

client.logger.info
client.flow.get

*/
