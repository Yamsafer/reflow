export
type filePath = string

export
type aliasName = string

export
interface SuiteMapping {
  [Name: string]: filePath
}

export
interface Strategy {
  aliasNames: aliasName[]
  mapping: SuiteMapping
  generateMapping(): Promise<void>
}

export
class Strategy {
  constructor(aliasNames: aliasName[]) {
    this.aliasNames = aliasNames
    this.mapping = {};
  }
  locate(suiteName: aliasName): filePath {
    return this.mapping[suiteName]
  }
}
