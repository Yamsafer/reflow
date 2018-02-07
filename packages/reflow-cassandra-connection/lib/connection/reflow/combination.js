const transform = require('../../util/transform');
const insertJobsByProjectIDCQL = `
  INSERT INTO jobs_by_project_id (
    project_id,
    job_id,
    combiantion_id,
    github,
    jenkins,
    threads,
    flows,
    total_number_of_combinations,
    source_branch,
    target_branch,
    combination_successes,
    combination_failures,
    combination_skipped,
    combiantion_total,
    start_at,
    combination_end_at,
    combination_start_at,
    tags
  ) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?);`;

const insertFlowsByJobIDCQL = `
  INSERT INTO flows_by_job_id (
    job_id,
    flow_id,
    combiantion_id,
    flow_title,
    combination_successes,
    combination_failures,
    combination_skipped,
    combiantion_total,
    total_number_of_flow_combinations
  ) VALUES (?,?,?,?,?,?,?,?,?);`;

const insertCombinationByFlowIDCQL = `
  INSERT INTO combinations_by_flow_id (
    flow_id,
    combiantion_id,
    combination_successes,
    combination_failures,
    combination_skipped,
    combination_total,
    start_at,
    end_at
  ) VALUES (?,?,?,?,?,?,?,?);`;

const insertSuitesByCombinationIDCQL = `
  INSERT INTO suites_by_combination_id (
    combination_id,
    suite_id,
    title,
    level,
    tests
  ) VALUES (?,?,?,?,?);`;
const selectCQL = `SELECT * FROM combinations_by_flow_id WHERE flow_id = ?`;

const getQuery = (key, input) => {
  switch(key) {
    case 'combinationsByFlowID':
      return {
        query: insertCombinationByFlowIDCQL,
        params: [
          input.flowDetails.id,
          input.id,
          input.passes,
          input.failures,
          input.pending,
          input.passes + input.failures + input.pending,
          input.startTime,
          input.endTime,
        ]
      }
    case 'jobsByProjectID':
      return {
        query: insertJobsByProjectIDCQL,
        params: [
          "6366977657833263104",
          input.jobDetails.id,
          input.id,
          input.jobDetails.github,
          input.jobDetails.jenkins,
          input.jobDetails.numberOfThreads,
          input.jobDetails.numberOfFlows,
          input.jobDetails.numberOfCombinations,
          input.jobDetails.sourceBranch,
          input.jobDetails.targetBranch,
          input.passes,
          input.failures,
          input.pending,
          input.passes + input.failures + input.pending,
          input.jobDetails.startTime,
          input.endTime,
          input.startTime,
          transform.tags(input.jobDetails.tags),
        ],
      }
    case 'flowsByJobID':
      return {
        query: insertFlowsByJobIDCQL,
        params: [
          input.jobDetails.id,
          input.flowDetails.id,
          input.id,
          input.flowDetails.title,
          input.passes,
          input.failures,
          input.pending,
          input.passes + input.failures + input.pending,
          input.flowDetails.totalCombinations,
        ],
      }
    case 'suitesByCombinationID':
      return {
        query: insertSuitesByCombinationIDCQL,
        params: [
          input.id,
          input.suite.id,
          input.suite.title,
          input.suite.level,
          input.suite.tests.map(test => ({
            test_id: test.id,
            combination_id: input.id,
            title: test.title,
            result: test.result,
            speed: test.speed,
            duration: test.duration,
            code: test.code,
            err: test.err,
            metadata: test.metadata,
          })),
        ],
      }
  };
};

module.exports = client => ({
  insert(input) {
    const queries = [
      getQuery('jobsByProjectID', input),
      getQuery('flowsByJobID', input),
      getQuery('combinationsByFlowID', input),
      ...input.suites.map(suite => {
        return getQuery('suitesByCombinationID', {id: input.id, suite})
      }),
    ];

    const queryOpts = {};
    // const queryOpts = { timestamp: CassandraTypes.generateTimestamp(timestamp) };
    return client.batch(queries, queryOpts).then(result => {
      return {
        flowID: input.flowDetails.id
      };
    });
  },

  getByFlowID(flowID, cursorInfo) {
    return client.execute(selectCQL, [flowID]).then(result => {
      return result.rows.map(row => {
        const combinationID = row.combiantion_id.toJSON();
        return {
          node: {
            id: combinationID,
            passes: row.combination_successes,
            pending: row.combination_skipped,
            failures: row.combination_failures,
            startTime: row.start_at,
            endTime: row.end_at,
            suites: {combinationID}
          }
        }
      })
    });
  }
})
