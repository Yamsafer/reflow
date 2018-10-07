import * as vm from 'vm'
import {runInSandbox} from '../../sandbox';
import {Title} from '../../'

import {
  Strategy,
  TitlePathMapping,
  StrategyConfig,
  FilePath,
} from './base'

interface Resolver {
  title: Title,
  fn?: any,
}

interface ReflowSandbox extends vm.Context {
  resolvers: Resolver[],
  flow(title: Title, fn?: any): void,
  subflow(title: Title, fn?: any): void,
  hook(title: Title, fn?: any): void,
  describe(title: Title, fn?: any): void,
}

const reflowSandbox:ReflowSandbox = {
  resolvers: [],
  subflow(title: Title, fn: any): void {
    reflowSandbox.resolvers.push({title, fn});
  },
  hook(title: Title, fn: any): void {
    reflowSandbox.resolvers.push({title, fn});
  },
  flow(title: Title, fn: any): void {
    reflowSandbox.resolvers.push({title, fn});
  },
  describe(title: Title): void {
    reflowSandbox.resolvers.push({title});
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
    const sandboxes = await Promise.all(
      this.filePaths.map((filePath:FilePath) => runInSandbox(filePath, reflowSandbox))
    ) as ReflowSandbox[]

    sandboxes
      .map(sandbox => sandbox.resolvers)
      .forEach((resolvers: Resolver[], index: number) => {
        const filePath: FilePath =  this.filePaths[index];
        resolvers.forEach((resolver: Resolver) => {
          const {title, fn} = resolver
          mapping[title] = {path: filePath, fn};
        })
      })

    this.mapping = mapping;
  }
}
