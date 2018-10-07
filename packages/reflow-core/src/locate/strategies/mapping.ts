import {
  Strategy,
  aliasName,
  SuiteMapping,
} from './base'

export
interface MappingStrategyConfig {
  aliasNames: aliasName[],
  mapping: SuiteMapping,
}

export
class MappingStrategy extends Strategy {
  constructor(config: MappingStrategyConfig) {
    const {
      aliasNames,
      mapping,
    } = config
    super(aliasNames);
    this.mapping = mapping
  }
  async generateMapping() {

  }
}
