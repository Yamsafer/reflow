const transform = require('../../util/transform');
const globalID = require('../../util/global-id');

const flowNode = flow => {
  const currComb = flow.current_number_of_flow_combinations.toJSON();
  const totalComb = flow.total_number_of_flow_combinations;
  const flowID = globalID.encode('flow', flow.flow_id.toJSON());
  return {
    id: flowID,
    title: flow.flow_title,
    passes: flow.successes,
    pending: flow.skipped,
    failures: flow.failures,
    currentNumberOfFlowCombinations: currComb,
    totalNumberOfFlowCombinations: totalComb,
    status: transform.status(currComb, totalComb),
    result: transform.result(currComb, totalComb, flow.failures),
    combinations: { flowID }
  }
}

module.exports = models => ({
  getFlowNode(flowID) {
    console.log('models::', models)
    return models.instance.flowsByFlowId.findAsync({
        flow_id: models.datatypes.Long.fromString(flowID),
      }, {
        select: [
        'flow_id',
        'flow_title',
        'SUM(combination_successes) as successes',
        'SUM(combination_skipped) as skipped',
        'SUM(combination_failures) as failures',
        'SUM(combiantion_total) as total',
        'total_number_of_flow_combinations',
        'COUNT(flow_id) as current_number_of_flow_combinations',
        ],
      }).then(flows => {
        return flows.map(flowNode).find(Boolean);
      });
  },
  getByJobID(encodedJobID, cursorInfo) {
    const jobID = globalID.decode(encodedJobID).id;
    return models.instance.flowsByJobId.findAsync({
        job_id: models.datatypes.Long.fromString(jobID),
      }, {
        select: [
          'flow_id',
          'flow_title',
          'SUM(combination_successes) as successes',
          'SUM(combination_skipped) as skipped',
          'SUM(combination_failures) as failures',
          'SUM(combiantion_total) as total',
          'total_number_of_flow_combinations',
          'COUNT(flow_id) as current_number_of_flow_combinations',
        ]
      }).then(flows => {
        console.log('flows::', flows)
        return flows.map(flow => ({
          node: flowNode(flow),
        }));
      });
  },
})
