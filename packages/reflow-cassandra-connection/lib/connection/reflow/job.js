const transform = require('../../util/transform');

const selectCQL = `
  SELECT
    job_id,
    threads,
    flows,
    source_branch,
    target_branch,
    github,
    start_at,
    SUM(combination_successes) as successes,
    SUM(combination_failures) as failures,
    SUM(combiantion_total) as total,
    total_number_of_combinations,
    COUNT(*) as current_number_of_combinations,
    MIN(combination_start_at) as first_reported,
    MAX(combination_end_at) as last_reported
  FROM jobs_by_project_id WHERE project_id = ?
  GROUP BY project_id, job_id ORDER BY job_id DESC;`;

module.exports = client => ({
  getByProjectID(projectID, cursorInfo) {
    return client.execute(selectCQL, [projectID])
      .then(result => {
        return result.rows.map(row => {
          const id = row.job_id.toJSON();
          const currComb = row.current_number_of_combinations.toJSON();
          const totalComb = row.total_number_of_combinations;

          return {
            node: {
              id,
              result: transform.result(currComb, totalComb, row.failures),
              endTime: transform.endTime(currComb, totalComb, row.last_reported),
              status: transform.status(currComb, totalComb),
              currentNumberOfCombinations: currComb,
              totalNumberOfCombinations: totalComb,
              numberOfThreads: row.threads,
              numberOfFlows: row.flows,
              github: row.github,
              jenkins: row.jenkins,
              tags: transform.tags(row.tags),
              sourceBranch: row.source_branch,
              targetBranch: row.target_branch,
              trigger: 'Jenkins',
              startTime: row.start_at,
              firstReported: row.first_reported,
              lastReported: row.last_reported,
              flows: {jobID: id}
            }
          }
        });
      });
  },
})
