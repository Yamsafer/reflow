const combinationConnection = require('./reflow/combination');
const projectConnection = require('./reflow/project');
const jobConnection = require('./reflow/job');
const flowConnection = require('./reflow/flow');
const suiteConnection = require('./reflow/suite');
const globalID = require('../util/global-id');

module.exports = client => ({
  project: projectConnection(client),
  job: jobConnection(client),
  flow: flowConnection(client),
  combination: combinationConnection(client),
  suite: suiteConnection(client),
  node(encodedID) {
    const decodedID = globalID.decode(encodedID);
    console.log('decodedID::', decodedID)
    switch(decodedID.type) {
      case 'flow':
        return this.flow.getFlowNode(decodedID.id);
      default: return {}
    }
  },
})
