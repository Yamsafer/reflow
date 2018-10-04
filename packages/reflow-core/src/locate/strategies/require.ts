import * as vm from 'vm'
import {runInSandbox} from '../../sandbox';
import {Title} from '../../'

import {
  Strategy,
  TitlePathMapping,
  StrategyConfig,
  FilePath,
} from './base'

interface ReflowSandbox extends vm.Context {
  titles: Title[],
  subflow(title: Title): void,
  flow(title: Title): void,
  describe(title: Title): void,
}

const reflowSandbox:ReflowSandbox = {
  titles: [],
  subflow(title: Title): void {
    reflowSandbox.titles.push(title);
  },
  flow(title: Title): void {
    reflowSandbox.titles.push(title);
  },
  describe(title: Title): void {
    reflowSandbox.titles.push(title);
  }
}

export
interface RequireStrategyConfig extends StrategyConfig {

}

export
class RequireStrategy extends Strategy {
  constructor(config: RequireStrategyConfig) {
    const {
      glob,
    } = config;
    super({ glob })
  }
  async generateMapping() {
    const mapping: TitlePathMapping = {};
    const titlesLists = await Promise.all(
      this.filePaths.map((filePath:FilePath) => runInSandbox(filePath, reflowSandbox))
    )

    titlesLists.forEach((titleList: ReflowSandbox, index: number) => {
      const titlePath: FilePath =  this.filePaths[index];
      titleList.titles.forEach((title: Title) => {
        mapping[title] = titlePath;
      })
    })

    this.mapping = mapping;
  }
}
