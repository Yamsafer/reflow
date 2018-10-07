import * as zipObject from 'lodash.zipobject'

import {
  LocateStrategy,
  Strategy,
  SuiteName,
  SuiteMapping,
  SuitePath,
} from './base'

export
class SimpleStrategy extends LocateStrategy implements Strategy {
  suitesPaths: SuitePath[]
  mapping: SuiteMapping
  constructor(suiteNames: SuiteName[]) {
    super(suiteNames);
    this.suitesPaths = suiteNames as SuitePath[];
  }
  async generateMapping() {
    this.mapping = zipObject(this.suiteNames, this.suitesPaths);
  }
}
