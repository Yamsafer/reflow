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
    const customQuery =`
      select
        flow_id,
        flow_title,
        SUM(combination_successes) as successes,
        SUM(combination_skipped) as skipped,
        SUM(combination_failures) as failures,
        SUM(combiantion_total) as total,
        total_number_of_flow_combinations,
        COUNT(flow_id) as current_number_of_flow_combinations
      from flows_by_job_id
      where job_id = ? GROUP BY flow_id`;

    const flowToNode = flow => ({ node: flowNode(flow) });

    return new Promise((resolve, reject) => {
      return models.instance.flowsByJobId.execute_query(
        customQuery,
        [jobID],
        (err, result) => (err)? reject(err) : resolve(result.rows),
      )
    })
    .then(flows => {
      return flows.map(flowToNode);
    });
  },
})
