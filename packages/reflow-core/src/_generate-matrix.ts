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

type MatrixEntries = MatrixEntry<any>[]

interface MatrixEntry<ReflowType> {
  type: ReflowType,
  name: string,
  resolve: any,
  evaluated?: any,
}
// import * as util from 'util';

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
  const hookLocator = await getLocator('require', { glob: hooks });
  const suiteLocator = await getLocator(locateStrategy, {...strategyOptions, glob: suites });

  const createReflowContext = () => {
    const matrix:MatrixEntries = [];
    const reflowContext = {
      matrix,
      flow(title: Title, flowDetails: any) {
        reflowContext.matrix = flowDetails();
      },
      subflow(title: Title, subflowDetails: any) {
        reflowContext.matrix = subflowDetails().suites;
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
        };
      },
      getHook(title: Title): MatrixEntry<ReflowType.Hook> {
        return {
          name: title,
          type: ReflowType.Hook,
          resolve: hookLocator.locate(title),
        }
      },
      fork(entries: MatrixEntry<ReflowType>[]): MatrixEntry<any>[] {
        return entries
      },
    };
    return reflowContext
  }

  async function generateMatrix(filePath: string): Promise<MatrixEntries> {
    const reflowContext = createReflowContext()
    await runInSandbox(filePath, reflowContext)
    const evaluatedMatrix:MatrixEntries = reflowContext.matrix;

    const results = evaluatedMatrix.map((entry: MatrixEntry<any>) => {
      if(entry.type === ReflowType.Subflow) {
        return generateMatrix(entry.resolve)
      }
      if(Array.isArray(entry)) {
        return entry.map(forkEntry => generateMatrix(forkEntry.resolve))
      }
      return Promise.resolve([entry])
    });

    const finalResult = await Promise.all([...results])
    return finalResult.map((result: any) => {
      if(result.length === 1) return result[0];
      return result;
    })

    return finalResult[0]
  }
  return generateMatrix
}
