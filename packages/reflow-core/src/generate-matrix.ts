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
  path: string,
  name: string,
  resolve?: any
}

export
const createMatrixGenerator = async function(reflowConfig: ReflowConfig) {
  const {
    // flowPaths,
    // hookPaths,
    suites,
    subflows,
    locateStrategy = 'require',
    strategyOptions,
  } = reflowConfig;

  // const flowLocator = await getLocator('require', { filePaths: flowPaths });
  const subflowLocator = await getLocator('require', { glob: subflows });
  // const hookLocator = await getLocator('require', { filePaths: hookPaths });
  const suiteLocatorStrategyOptions = Object.assign({}, { glob: suites }, strategyOptions)
  const suiteLocator = await getLocator(locateStrategy, suiteLocatorStrategyOptions);

  const reflowContext = {
    matrix: [],
    flow(flowName: Title, flowDetails: any) {
      reflowContext.matrix = flowDetails();
    },
    getSuite(title: Title): MatrixEntry<ReflowType.Suite> {
      return {
        name: title,
        type: ReflowType.Suite,
        path: suiteLocator.locate(title),
      };
    },
    getSubflow(title: Title): MatrixEntry<ReflowType.Subflow> {
      return {
        name: title,
        type: ReflowType.Subflow,
        path: subflowLocator.locate(title),
      }
    },
    // getHook(title: Title): MatrixEntry<ReflowType.Hook> {
    //   return {
    //     name: title,
    //     type: ReflowType.Hook,
    //     path: hookLocator.locate(title),
    //   }
    // },
    fork(entries: MatrixEntry<ReflowType>[]): MatrixEntry<ReflowType.Fork> {
      return {
        type: ReflowType.Fork,
        name: 'fork',
        path: '',
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
