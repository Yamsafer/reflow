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
    return new Promise((resolve, reject) => {
      models.flowsByFlowId.find({flow_id: flowID}, { select: [
        'flow_id',
        'flow_title',
        'SUM(combination_successes) as successes',
        'SUM(combination_skipped) as skipped',
        'SUM(combination_failures) as failures',
        'SUM(combiantion_total) as total',
        'total_number_of_flow_combinations',
        'COUNT(*) as current_number_of_flow_combinations',
      ]}, function(err, flows) {
        if(err) return reject(err);
        console.log('flows::', flows)
        const result = flows.map(flowNode).find(Boolean);
        resolve(result);
      })
    });
  },
  getByJobID(encodedJobID, cursorInfo) {
    const jobID = globalID.decode(encodedJobID).id;
    return new Promise((resolve, reject) => {
      models.instance.flowsByJobId.find({
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
      }, (err, flows) => {
        if(err) return reject(err);
        console.log('flows::', flows)
        const result = flows.map(flow => ({
          node: flowNode(flow),
        }));
        resolve(result);
      });
    });
  },
})
