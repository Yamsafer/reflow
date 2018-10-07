import {Title} from '../../'
import {
  GlobObject,
  Pattern,
  globAsync,
  createGlobObject,
} from '../../utils/glob'

export
type FilePath = string


export
interface StrategyConfig {
  glob: Pattern | GlobObject
}

export
interface Entity {
  path: FilePath,
  fn?: any
}

export
interface TitlePathMapping {
  [Name: string]: Entity
}

export
interface Strategy {
  titles: Title[],
  filePaths: FilePath[],
  glob: GlobObject,
  mapping: TitlePathMapping,
  generateMapping(): Promise<void>,
}

export
class Strategy {
  constructor(config: StrategyConfig) {
    this.glob = createGlobObject(config.glob);
    this.mapping = {};
    this.filePaths = [];
  }
  async generateFilePaths(): Promise<void> {
    if(!this.glob || this.filePaths.length) return;
    const {
      pattern,
      globOptions,
    } = this.glob;

    this.filePaths = await globAsync(pattern, globOptions)
  }

  locate(title: Title): Entity {
    return this.mapping[title]
  }
}
