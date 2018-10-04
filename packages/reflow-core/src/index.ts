import isMatch from 'lodash.ismatch'
import executeMatrix from './execute'
import { evaluateFlow, evaluateSubflow } from './evaluate';
import analyzeMatrix from './analyze'
import * as FlakeId from 'flake-idgen'
import {createReflowContext} from './context'




subflow("mySubflow", function() {
  getSuite("suite 1");
})

flow("myFlow", function() {

  getSuite("suite 1");
  getSuite("suite 2");
  fork(
    getSuite("suite 3"),
    getSuite("suite 4"),
  )
  getSubflow("subflow 1")

})

type FlowName = string
type SubflowName = string
const data = {
  flows: {},
  subflows: {}
};



const context = {
  flow(flowName: FlowName, flowDetails) {
    data.flows[flowName] = flowDetails;
  },
  subflow(subflowName: SubflowName, subflowDetails) {
    data.subflows[subflowName] = subflowDetails;
  },

}


export
function createTestsCartesianProduct(flowsPath: FlowPath[]) {
  flowsPath.forEach(flowPath => {
    const flow = require(flowPath);
  })
}


/*
1. gather flows
 */

export
type FlowPath = string;


export
interface ReflowConfig {
  flowsPath: FlowPath,
  locateStrategy?: string,
  strategyOptions: any,
}


import {getLocate} from './locate'
const locateSubflow = (strategyOptions) => {
  const locate = getLocate('require', {
    aliasNames
    filePaths
  });

}

const getStrategy = (locateStrategy) => {

}
export
function runReflow(reflowConfig: ReflowConfig) {
  const {
    flowsPath,
    locateStrategy = 'mapping',
    strategyOptions,
  } = reflowConfig;
  // const strategy = getStrategy(locateStrategy)

  // const testDetails = createTestsCartesianProduct();

}

// class Reflow {
//   constructor(options, caps) {
//     this.connection = caps.connection;
//     this.devices = caps.devices;
//     this.options = options;
//     this.files = [];
//     this.suites = {};
//     this.subflows = {};
//     this.flows = {};
//     this.hooks = {};
//     this.flake = new FlakeId();
//     this.run = false;
//     this.jobID = this.flake.next();
//   }

//   gatherMatrices() {
//     console.log('Gathering Matrices.')
//     this.files.forEach(filepath => {
//       Object.assign(global, createReflowContext.call(this, filepath))
//       require(filepath);
//     })
//   }
//   runFlows() {
//     const flowsList = Object.values(this.flows);
//     console.log(`${flowsList.length} total flows.`)
//     let totalCombinations = 0;
//     const matrices = flowsList.map(({name, fn}) => {
//       const suites = fn();
//       if(!Array.isArray(suites)) throw new Error(`no suites provided in flow "${name}".`);
//       const matrix = evaluateFlow(suites, this.options.tags);
//       const currentCombinations = matrix.length
//       totalCombinations += currentCombinations;

//       return {
//         matrix: matrix.map((tree, i) => ({
//           name: `${name}: combination #${i+1}/${currentCombinations}`,
//           type: "tree",
//           index: i,
//           suites: tree,
//         })),
//         flowDetails: {
//           id: this.flake.next(),
//           title: name,
//           totalCombinations: currentCombinations,
//         },
//       }
//     });

//     this.jobDetails = {
//       id: this.jobID,
//       numberOfThreads: Math.min(this.options.numberOfThreads, totalCombinations),
//       numberOfCombinations: totalCombinations,
//       numberOfFlows: flowsList.length,
//       sourceBranch: this.options.job.source,
//       targetBranch: this.options.job.target,
//       jenkins: this.options.job.id,
//       tags: this.options.tags,
//       startTime: new Date(),
//     }
//     console.log(`Job Details: ${JSON.stringify(this.jobDetails, 2, 2)}`);

//     matrices.forEach(matrix => this.runFlow(matrix))
//   }
//   analyzeFlows() {
//     const analyzedMatrices = Object.values(this.flows).map(this.analyze.bind(this));
//     analyzedMatrices.forEach(({name, analysis}) => {
//       console.log(`${name}: (${analysis.length} combinations)`,)
//       console.log(analysis.join('\n'));
//     })
//   }

//   analyze({name, fn}) {
//     const suites = fn();
//     const matrix = evaluateFlow(suites, this.options.tags);

//     return {
//       name,
//       analysis: analyzeMatrix(matrix),
//     };
//   }

//   runFlow({matrix, flowDetails}) {

//     this.devices.forEach(capability => {
//       console.log(`Running "${flowDetails.title}" Flow on "${capability.deviceName}" (${flowDetails.totalCombinations} total combinations)`)

//       executeMatrix(matrix, {
//         ...this.options,
//         flowDetails,
//         capability,
//         jobDetails: this.jobDetails,
//         connection: this.connection,
//       });
//     })
//   }
// }


// export default Reflow
