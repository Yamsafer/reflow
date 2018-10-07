import {
  ReflowConfig,
  Title,
} from './'

import {getLocator} from './locate'
import {runInSandbox} from './sandbox';

enum ReflowType {
  Suite,
  Subflow,
  Hook,
  Fork,
}

interface MatrixEntry<ReflowType> {
  type: ReflowType,
  name: string,
  resolve: any,
  evaluated?: any,
}

export
const createMatrixGenerator = async function(reflowConfig: ReflowConfig) {
  const {
    // flowPaths,
    hooks,
    suites,
    subflows,
    locateStrategy = 'require',
    strategyOptions,
  } = reflowConfig;

  // const flowLocator = await getLocator('require', { filePaths: flowPaths });
  const subflowLocator = await getLocator('require', { glob: subflows });
  const hookLocator = await getLocator('require', { filePaths: hooks });
  const suiteLocator = await getLocator(locateStrategy, {...strategyOptions, glob: suites });

  const reflowContext = {
    matrix: [],
    flow(title: Title, flowDetails: any) {
      reflowContext.matrix = flowDetails();
    },
    getSuite(title: Title): MatrixEntry<ReflowType.Suite> {
      return {
        name: title,
        type: ReflowType.Suite,
        resolve: suiteLocator.locate(title),
      };
    },
    getSubflow(title: Title): MatrixEntry<ReflowType.Subflow> {
      const resolve = subflowLocator.locate(title);
      return {
        name: title,
        type: ReflowType.Subflow,
        resolve,
        evaluated: resolve.fn(),
      }
    },
    getHook(title: Title): MatrixEntry<ReflowType.Hook> {
      return {
        name: title,
        type: ReflowType.Hook,
        resolve: hookLocator.locate(title),
      }
    },
    fork(entries: MatrixEntry<ReflowType>[]): MatrixEntry<ReflowType.Fork> {
      return {
        type: ReflowType.Fork,
        name: 'fork',
        resolve: entries,
      }
    },
  }

  return async function generateMetrix(filePath: string) {
    await runInSandbox(filePath, reflowContext)
    const result = reflowContext.matrix;
    reflowContext.matrix = [];
    return result
  }
}
