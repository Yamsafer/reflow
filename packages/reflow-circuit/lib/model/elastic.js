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
          numberOfSuites: {
            "sum":{ "field": "numberOfSuites" }
          },
          "top_tags": {
            "terms": {
              "field": "jobDetails.id",
              "size": cursorInfo.first,
            },
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
        return {
          ...bucket.top_sales_hits.hits.hits[0]._source.jobDetails,
          result: result.aggregations.failures.value > 0 ? "FAILURE" : "SUCCESS"
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
                      "size" : 1
                    }
                  }
                }
              }
            }
          }
        }
      }
    }).then(result => {
      console.log('result:::::::', result);
      return result;
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
})

