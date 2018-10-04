import {
  Strategy,
  SuiteName,
  SuiteMapping,
  SuitePath,
} from './base'

export
interface RegexStrategyConfig {
  suiteNames: SuiteName[]
}

export
class RegexStrategy extends Strategy {
  constructor(config: RegexStrategyConfig) {
    const {
      suitesNames,
    } = config
    super(suitesNames);
  }
  async generateMapping() {
    const mapping: SuiteMapping = {};
    // read file text then regex over
    this.mapping = mapping;
  }
  locate(suiteName: SuiteName): SuitePath {
    return this.mapping[suiteName]
  }
}
