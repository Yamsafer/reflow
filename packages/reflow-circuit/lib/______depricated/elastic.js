  // getCombinationsByFlowIds(combinationIds) {
  //   return client.mget({
  //     index: 'reflow',
  //     type: 'flow',
  //     body: {
  //       ids: combinationIds,
  //     }
  //   }).then(result => result.docs)
  // },




  createFlow(body) {
    return client.index({
      index: 'reflow',
      type: 'flow',
      body: {
        ...body,
        jobDetails: {
          ...body.jobDetails,
          creationDate: Date.parse(body.jobDetails.creationDate),
        }
      },
    })
  },
  getFlowsByJobsIds(jobsIds) {
    console.log('jobsIds::', jobsIds)
    return client.msearch({
      // index: 'reflow',
      // type: 'flow',
      body: jobsIds.reduce((acc, jobId) => {
        return acc.concat([
          { index: 'reflow', type: 'flow' },
          { query: { query_string: { query: `jobDetails.id:${jobId}` } } }
        ])
      }, []),
    }).then(result => {
      return result.responses
              .map(response => response.hits)
              .map(hit => hit.hits)
    })
  },
  getFlows(cursorInfo) {
    return client.search({
      index: 'reflow',
      sort: ["_id:asc"],
      size: cursorInfo.first,
      body: {
        search_after: cursorInfo.after && [cursorInfo.after],
      },
    }).then(result => {
      return result.hits.hits;
    })
  },
  // getFlowsByIds(flowsIds) {
  //   return client.mget({
  //     index: 'reflow',
  //     type: 'flow',
  //     body: {
  //       ids: flowsIds,
  //     }
  //   }).then(result => result.docs)
  // },
  getFlowsByJobIds(jobIds) {
    return client.search({
      index: 'reflow',
      type: 'flow',
      body: {
        jobDetails: {
          ids: jobIds,
        }
      }
    }).then(result => result.hits.hits)
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
            },
            "aggs": {
              "top_sales_hits": {
                "top_hits": {
                  "sort": [
                    {
                      "jobDetails.creationDate": {
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
        return bucket.top_sales_hits.hits.hits[0]._source.jobDetails
      });
    })
  }





  getFlowsByIds(flowIds) {
    return client.msearch({
      body: flowIds.reduce((acc, flowId) => {
        return acc.concat([
          { index: 'reflow', type: 'flow' },
          { query: { query_string: { query: `flowDetails.id:${flowId}` } } }
        ])
      }, []),
    }).then(result => {
      return result.responses
        .map(response => response.hits)
        .map(hit => hit.hits)
    })
  },
