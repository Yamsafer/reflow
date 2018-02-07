const combinationConnection = require('./reflow/combination');
const projectConnection = require('./reflow/project');
const jobConnection = require('./reflow/job');
const flowConnection = require('./reflow/flow');
const suiteConnection = require('./reflow/suite');


module.exports = client => ({
  projects: projectConnection(client),
  job: jobConnection(client),
  flow: flowConnection(client),
  combination: combinationConnection(client),
  suite: suiteConnection(client),
})
