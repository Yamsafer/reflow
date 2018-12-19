const _ = require('lodash')

const threadPool = require('./thread-pool');
const lookupFiles = require('./utils/lookup-files');
const executeMatrix = require('./execute')
const { evaluateFlow, evaluateSubflow } = require('./evaluate');
const analyzeMatrix = require('./analyze')
const FlakeId = require('flakeid')
const { join } = require('path')

const createReflowContext = function(filepath) {
  const self = this;
  return {
    describe(name) {
      self.suites[name] = filepath
    },
    subflow(name, configCb) {
      console.log(`Registering "${name}" Subflow.`);
      self.subflows[name] = configCb
    },
    flow(name, fn, options = {}) {
      self.flows[name] = {
        name,
        path: filepath,
        fn,
        options,
      };
    },
    hook(name) {
      console.log(`Registering "${name}" Hook.`);
      self.hooks[name] = filepath;
    },
    getHook(name, tags) {
      const suitePath = self.hooks[name];
      if(!suitePath) throw new Error(`Unable to find hook [ ${name} ].`);
      return {
        name,
        tags,
        path: suitePath,
        type: 'hook',
      }
    },
    getSubflow(name, tags) {
      const subflowDetail = self.subflows[name];
      if(!subflowDetail) throw new Error(`Unable to get subflow [ ${name} ].`);
      const activeTags = self.options.tags;

      if(_.isMatch(tags, activeTags)) {
        return evaluateSubflow(name , subflowDetail)
      }
      return null;
    },
    getSuite(name, tags) {
      const suitePath = self.suites[name];
      if(!suitePath) throw new Error(`Unable to find suite [ ${name} ].`);
      return {
        name,
        tags,
        path: suitePath,
        type: 'suite',
      };
    },
    fork(suites) {
      const activeTags = self.options.tags;

      const activeFork = suites
        .filter(Boolean)
        .filter(suite => _.isMatch(suite.tags, activeTags))
        .filter(Boolean)

      return activeFork.length? activeFork : null
    },
  }
};

class Reflow {
  constructor(options, caps) {
    this.connection = caps.connection;
    this.devices = caps.devices;
    this.options = options;
    this.files = [];
    this.suites = {};
    this.subflows = {};
    this.flows = {};
    this.hooks = {};
    this.flake = new FlakeId();
    this.run = false;
    this.jobID = this.flake.gen();
  }

  gatherMatrices() {
    console.log('Gathering Matrices.')
    this.files.forEach(filepath => {
      Object.assign(global, createReflowContext.call(this, filepath))
      require(filepath);
    })
  }
  runFlows() {
    const flowsList = Object.values(this.flows);
    console.log(`${flowsList.length} total flows.`)
    let totalCombinations = 0;

    const matrices = flowsList.map(({name, fn, options: flowOptions}) => {
      const suites = fn();
      if(!_.isArray(suites)) throw new Error(`no suites provided in flow "${name}".`);
      const matrix = evaluateFlow(suites, this.options.tags);
      const currentCombinations = matrix.length
      totalCombinations += currentCombinations;

      return {
        matrix: matrix.map((tree, i) => ({
          name: `${name}: combination #${i+1}/${currentCombinations}`,
          type: "tree",
          index: i,
          suites: tree,
        })),
        flowDetails: {
          id: this.flake.gen(),
          title: name,
          totalCombinations: currentCombinations,
          deviceTag: flowOptions.deviceTag,
        },
      }
    });

    this.jobDetails = {
      id: this.jobID,
      projectID: this.options.projectID,
      numberOfThreads: Math.min(this.options.numberOfThreads, totalCombinations),
      numberOfCombinations: totalCombinations,
      numberOfFlows: flowsList.length,
      sourceBranch: this.options.job.source,
      targetBranch: this.options.job.target,
      jenkins: this.options.job.id,
      tags: this.options.tags,
      startTime: new Date(),
    }
    console.log(`Job Details: ${JSON.stringify(this.jobDetails, 2, 2)}`);

    const pool = threadPool({
      workerPath: join(__dirname, './worker.js'),
      threadsToSpawn: this.jobDetails.numberOfThreads,
    });

    matrices.forEach(matrix => this.runFlow(matrix, pool))
  }

  analyzeFlows() {
    const analyzedMatrices = Object.values(this.flows).map(this.analyze.bind(this));
    analyzedMatrices.forEach(({name, analysis}) => {
      console.log(`${name}: (${analysis.length} combinations)`,)
      console.log(analysis.join('\n'));
    })
  }

  analyze({name, fn}) {
    const suites = fn();
    const matrix = evaluateFlow(suites, this.options.tags);

    return {
      name,
      analysis: analyzeMatrix(matrix),
    };
  }

  runFlow({ matrix, flowDetails }, pool) {
    this.devices.forEach(capability => {
      const flowTag = flowDetails.deviceTag;
      const capabilityTags = capability.remoteOptions.capabilities.tags;
      const { deviceName } = capability.remoteOptions.capabilities;
      const browserName = capability.remoteOptions.capabilities.applicationName;

      if (!flowTag || (capabilityTags && capabilityTags.includes(flowTag))) {
        console.log(`Running "${flowDetails.title}" Flow on "${deviceName || browserName}" (${flowDetails.totalCombinations} total combinations)`);

        executeMatrix(matrix, pool, {
          ...this.options,
          flowDetails,
          capability,
          jobDetails: this.jobDetails,
          connection: this.connection,
        });
      } else if (flowTag && !capabilityTags) {
        console.warn(`Skipping run of flow "${flowDetails.title} on device "${deviceName || browserName}"`);
        console.warn(`Device "${deviceName || browserName}" didn't include any tags while flow requires tag "${flowTag}" to exist`);
      }
    });
  }
}


module.exports = Reflow
module.exports.threadPool = threadPool
module.exports.lookupFiles = lookupFiles
