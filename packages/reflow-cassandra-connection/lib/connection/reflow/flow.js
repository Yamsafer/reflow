const transform = require('../../util/transform');

const selectCQL = `
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

module.exports = client => ({
  getByJobID(jobID, cursorInfo) {
    return client.execute(selectCQL, [jobID]).then(result => {
      return result.rows.map(row => {
        const currComb = row.current_number_of_flow_combinations.toJSON();
        const totalComb = row.total_number_of_flow_combinations;
        const flowID = row.flow_id.toJSON();
        return {
          node: {
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
      })
    });
  },
})
