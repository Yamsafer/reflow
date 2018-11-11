const globalID = require('../../util/global-id');

module.exports = models => ({
  insert(input) {
    const jobsByProjectID = new models.instance.jobsByProjectId({
      project_id: models.datatypes.Long.fromString(input.jobDetails.projectID || "6366977657833263104"),
      job_id: models.datatypes.Long.fromString(input.jobDetails.id),
      threads: input.jobDetails.numberOfThreads,
      flows: input.jobDetails.numberOfFlows,
      total_number_of_combinations: input.jobDetails.numberOfCombinations,
      combination_id: models.datatypes.Long.fromString(input.id),
      github: input.jobDetails.github,
      jenkins: input.jobDetails.jenkins,
      source_branch: input.jobDetails.sourceBranch,
      target_branch: input.jobDetails.targetBranch,
      combination_successes: input.passes,
      combination_failures: input.failures,
      combination_skipped: input.pending,
      combiantion_total: input.passes + input.failures + input.pending,
      start_at: input.jobDetails.startTime,
      combination_end_at: input.endTime,
      combination_start_at: input.startTime,
      tags: input.jobDetails.tags,
    });
    const combinationsByFlowId =  new models.instance.combinationsByFlowId({
      "flow_id": models.datatypes.Long.fromString(input.flowDetails.id),
      "combination_id": models.datatypes.Long.fromString(input.id),
      "combination_successes": input.passes,
      "combination_failures": input.failures,
      "combination_skipped": input.pending,
      "combination_total": input.passes + input.failures + input.pending,
      "start_at": input.startTime,
      "end_at": input.endTime,
    });
    const flowsByFlowId = new models.instance.flowsByFlowId({
      flow_id: models.datatypes.Long.fromString(input.flowDetails.id),
      flow_title: input.flowDetails.title,
      combination_id: models.datatypes.Long.fromString(input.id),
      combination_successes: input.passes,
      combination_failures: input.failures,
      combination_skipped: input.pending,
      combination_total: input.passes + input.failures + input.pending,
      total_number_of_flow_combinations: input.flowDetails.totalCombinations,
    });
    const flowsByJobId = new models.instance.flowsByJobId({
      job_id: models.datatypes.Long.fromString(input.jobDetails.id),
      flow_id: models.datatypes.Long.fromString(input.flowDetails.id),
      flow_title: input.flowDetails.title,
      combination_id: models.datatypes.Long.fromString(input.id),
      combination_successes: input.passes,
      combination_failures: input.failures,
      combination_skipped: input.pending,
      combination_total: input.passes + input.failures + input.pending,
      total_number_of_flow_combinations: input.flowDetails.totalCombinations,
    });

    return new Promise((resolve, reject) => {
      models.doBatch([
        jobsByProjectID.save({return_query: true}),
        combinationsByFlowId.save({return_query: true}),
        flowsByFlowId.save({return_query: true}),
        flowsByJobId.save({return_query: true}),
        ...input.suites.map(suite => {
          return new models.instance.suitesByCombinationId({
            combination_id: models.datatypes.Long.fromString(input.id),
            suite_id: models.timeuuid(),
            title: suite.title,
            level: suite.level,
            tests: suite.tests.map(test => ({
              combination_id: models.datatypes.Long.fromString(input.id),
              title: test.title,
              result: test.result,
              speed: test.speed,
              duration: test.duration,
              code: test.code,
              err: test.err,
              metadata: test.metadata,
            })),
          }).save({return_query: true});
        }),
      ], err => {
        if(err) return reject(err);
        resolve({
          flowID: globalID.encode('flow', input.flowDetails.id),
        });
      });
    });
  },

  getByFlowID(encodedFlowID, cursorInfo) {
    const flowID = globalID.decode(encodedFlowID).id;

    return models.instance.combinationsByFlowId.findAsync({
        flow_id: models.datatypes.Long.fromString(flowID),
      }).then(combinations => {
        return combinations.map(combination => {
          const combinationID = globalID.encode('combination', combination.combination_id.toJSON());
          return {
            node: {
              id: combinationID,
              passes: combination.combination_successes,
              pending: combination.combination_skipped,
              failures: combination.combination_failures,
              startTime: combination.start_at,
              endTime: combination.end_at,
              suites: {combinationID}
            }
          }
        });
      });
  }
})
