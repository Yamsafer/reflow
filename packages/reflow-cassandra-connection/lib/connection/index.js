const combinationConnection = require('./reflow/combination');
const projectConnection = require('./reflow/project');
const jobConnection = require('./reflow/job');
const flowConnection = require('./reflow/flow');
const suiteConnection = require('./reflow/suite');
const globalID = require('../util/global-id');

module.exports = models => ({
  project: projectConnection(models),
  job: jobConnection(models),
  flow: flowConnection(models),
  combination: combinationConnection(models),
  suite: suiteConnection(models),
  node(encodedID) {
    const decodedID = globalID.decode(encodedID);
    switch(decodedID.type) {
      case 'flow':
        return this.flow.getFlowNode(decodedID.id);
      default:
        throw new Error('Sorry. Only `flow` nodes are traversable.')
    }
  },
})
