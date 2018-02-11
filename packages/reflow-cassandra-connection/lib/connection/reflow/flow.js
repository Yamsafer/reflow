const transform = require('../../util/transform');
const globalID = require('../../util/global-id');

const getByJobIDCQL = `
  SELECT
    flow_id,
    flow_title,
    SUM(combination_successes) as successes,
    SUM(combination_skipped) as skipped,
    SUM(combination_failures) as failures,
    SUM(combiantion_total) as total,
    total_number_of_flow_combinations,
    COUNT(*) as current_number_of_flow_combinations
  FROM flows_by_job_id WHERE job_id = ?
  GROUP BY job_id, flow_id ORDER BY flow_id DESC;`;

const getFlowNodeCQL = `
  SELECT
    flow_id,
    flow_title,
    SUM(combination_successes) as successes,
    SUM(combination_skipped) as skipped,
    SUM(combination_failures) as failures,
    SUM(combiantion_total) as total,
    total_number_of_flow_combinations,
    COUNT(*) as current_number_of_flow_combinations
  FROM flows_by_flow_id WHERE flow_id = ?
  GROUP BY combiantion_id ORDER BY combiantion_id DESC;`;

const flowNode = row => {
  const currComb = row.current_number_of_flow_combinations.toJSON();
  const totalComb = row.total_number_of_flow_combinations;
  const flowID = globalID.encode('flow', row.flow_id.toJSON());
  return {
    id: flowID,
    title: row.flow_title,
    passes: row.successes,
    pending: row.skipped,
    failures: row.failures,
    currentNumberOfFlowCombinations: currComb,
    totalNumberOfFlowCombinations: totalComb,
    status: transform.status(currComb, totalComb),
    result: transform.result(currComb, totalComb, row.failures),
    combinations: { flowID }
  }
}

module.exports = client => ({
  getFlowNode(flowID) {
    return client.execute(getFlowNodeCQL, [flowID]).then(result => {
      return result.rows.map(flowNode).find(Boolean);
    })
  },
  getByJobID(encodedJobID, cursorInfo) {
    const jobID = globalID.decode(encodedJobID).id;
    return client.execute(getByJobIDCQL, [jobID]).then(result => {
      return result.rows.map(row => ({
        node: flowNode(row),
      }))
    });
  },
})
