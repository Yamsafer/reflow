const transform = require('../../util/transform');
const globalID = require('../../util/global-id');

module.exports = models => ({
  getByProjectID(encodedProjectID, cursorInfo) {
    const projectID = globalID.decode(encodedProjectID).id;
    return models.instance.jobsByProjectId.findAsync({
        project_id: models.datatypes.Long.fromString(projectID),
      }, {
        select: [
          'job_id',
          'threads',
          'flows',
          'source_branch',
          'target_branch',
          'github',
          'start_at',
          'SUM(combination_successes) as successes',
          'SUM(combination_failures) as failures',
          'SUM(combiantion_total) as total',
          'total_number_of_combinations',
          'COUNT(job_id) as current_number_of_combinations',
          'MIN(combination_start_at) as first_reported',
          'MAX(combination_end_at) as last_reported',
        ],
      }).then(jobs => {
        return jobs.map(row => {
          const jobID = globalID.encode('job', row.job_id.toJSON());
          const currComb = row.current_number_of_combinations.toJSON();
          const totalComb = row.total_number_of_combinations;

          return {
            node: {
              id: jobID,
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
              flows: { jobID }
            }
          }
        });
      });
  },
})
