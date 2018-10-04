import {SuiteFunction, Suite} from 'mocha';
import {
  Strategy,
  aliasName,
  SuiteMapping,
  filePath,
} from './base'

/*
Requires the files to locate suites based on suite name

  ['Describe Name']
  ['test/file1.spec.ts', 'test/file2.spec.ts']
  {'Describe Name' : 'test/file1.spec.ts'}

 */

export
interface RequireStrategyConfig {
  aliasNames: aliasName[],
  filePaths: filePath[],
}

export
class RequireStrategy extends Strategy {
  filePaths: filePath[]
  constructor(config: RequireStrategyConfig) {
    const {
      aliasNames,
      filePaths,
    } = config;
    super(aliasNames)
    this.filePaths = filePaths;
  }
  async generateMapping() {
    const mapping: SuiteMapping = {};
    const originalDescribe = global.describe;
    this.filePaths.forEach(suitePath => {
      const stub = (title: string, fn?: (this: Suite) => void): any => {
        mapping[title] = suitePath;
      };

      const describeStub: SuiteFunction = Object.assign(stub, {
        only: stub,
        skip: stub,
      })

      global.describe = describeStub
      require(suitePath);
    });
    global.describe = originalDescribe;
    this.mapping = mapping;
  }
}
