module.exports = client => ({
  newCombination(body) {
    return client.index({
      index: 'reflow',
      type: 'flow',
      body,
    }).then(result => ({
      id: result._id,
      startTime: body.startTime,
      endTime: body.endTime,
      passes: body.passes,
      skips: body.skips,
      failures: body.failures,
      result: body.status,
      suites: body.suites,
      diagram: body.diagram,
    }));
  },
  getJobs(cursorInfo) {
    return client.search({
      index: 'reflow',
      type: 'flow',
      size: 0,
      body: {
        "aggs": {
          "top_tags": {
            "terms": {
              "field": "jobDetails.id",
              "size": cursorInfo.first,
              "order" : { "JobStartTime" : "desc" },
            },
            "aggs": {
              "passes": {
                "sum":{ "field": "passes" }
              },
              "failures": {
                "sum":{ "field": "failures" }
              },
              "pending": {
                "sum":{ "field": "pending" }
              },
              "endTime": {
                "max":{ "field": "endTime" }
              },
              totalNumberOfSuites: {
                "sum":{ "field": "numberOfSuites" }
              },
              "JobStartTime" : { "min" : { "field" : "jobDetails.startTime" } },
              "currentNumberOfCombinations": {
                "terms": {
                  "field": "jobDetails.id",
                  "size": 1,
                },
              },
              "top_sales_hits": {
                "top_hits": {
                  "sort": [
                    {
                      "jobDetails.startTime": {
                        "order": "asc"
                      }
                    }
                  ],
                  "_source": {
                    "includes": [ "jobDetails" ]
                  },
                  "size" : 1
                }
              }
            }
          }
        }
      }
    }).then(result => {
      return result.aggregations.top_tags.buckets.map(bucket => {
        const jobDetails = bucket.top_sales_hits.hits.hits[0]._source.jobDetails;
        const currentNumberOfCombinations = bucket.currentNumberOfCombinations.buckets[0].doc_count;
        const totalNumberOfCombinations = jobDetails.numberOfCombinations;

        const totalFailures = bucket.failures.value;
        console.log('totalFailures:', totalFailures)
        console.log('currentNumberOfCombinations:', currentNumberOfCombinations)
        console.log('totalNumberOfCombinations:', totalNumberOfCombinations)
        const totalNumberOfSuites = bucket.totalNumberOfSuites.value;

        const getResult = function () {
          if(totalNumberOfCombinations > currentNumberOfCombinations) return 'PENDING';
          return totalFailures > 0 ? "FAILURE" : "SUCCESS";
        }
        console.log('result::::::::::', getResult())

        return {
          ...jobDetails,
          numberOfSuites: totalNumberOfSuites,
          result: getResult(),
        }
      });
    })
  },
  getFlows(jobId) {
    return client.search({
      index: 'reflow',
      type: 'flow',
      size: 0,
      body: {
        aggs: {
          categories: {
            filter: {term: {"jobDetails.id": jobId}},
            aggs: {
              names: {
                terms: {"field": "flowDetails.id"},
                "aggs": {
                  "top_sales_hits": {
                    "top_hits": {
                      "sort": [
                        {
                          "jobDetails.startTime": {
                            "order": "asc"
                          }
                        }
                      ],
                      "_source": "*",
                      "size" : 100,
                    }
                  }
                }
              }
            }
          }
        }
      }
    }).then(result => {
      const Flows = result.aggregations.categories.names.buckets.map(bucket => {
        return bucket.top_sales_hits.hits.hits.map(combination => {
          const data = combination._source;
          return {
            id: data.flowDetails.id,
            title: data.flowDetails.title,
            passes: data.passes,
            pending: data.pending,
            failures: data.failures,
            combinations: [],
            result: data.result,
          }
        })
      }).find(Boolean);
      return Flows;
    })
  },
  getCombinationsByIds(combinationIds) {
    return client.mget({
      index: 'reflow',
      type: 'flow',
      body: {
        ids: combinationIds,
      }
    }).then(result => result.docs.map(doc => {
      return {
        id: doc._id,
        ...doc._source,
      }
    }))
  },
  getFlow(flowId) {
    return client.search({
      index: 'reflow',
      type: 'flow',
      size: 0,
      body: {
        aggs: {
          categories: {
            filter: { term: { "flowDetails.id" : flowId } },
            aggs: {
              "top_combinations": {
                "top_hits": {
                  "sort": [
                    {
                      "startTime": {
                        "order": "asc"
                      }
                    }
                  ],
                  "_source": "*",
                  "size" : 1,
                }
              },
              totalPasses: { "sum": { "field": "passes" } },
              totalFailures: { "sum": { "field": "failures" } },
              totalPending: { "sum": { "field": "pending" } },
            }
          }
        }
      }
    }).then(result => {
      console.log('result::', result)
      const resultHits =  result.aggregations.categories.top_combinations.hits.hits;
      const Combinations = resultHits.map(hit => {
        return Object.assign({}, hit._source, {
          id: hit._id,
        });
      });
      const Flow = {
        id: resultHits[0]._source.flowDetails.id,
        passes: result.aggregations.categories.totalPasses.value,
        pending: result.aggregations.categories.totalPending.value,
        failures: result.aggregations.categories.totalFailures.value,
        combinations: Combinations
      }
      console.log('Flow::', Flow);
      return Flow;
    })
  }
})

