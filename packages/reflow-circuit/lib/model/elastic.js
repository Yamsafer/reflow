module.exports = client => ({
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
  getFlowsByIds(flowIds) {
    return client.mget({
      index: 'reflow',
      type: 'flow',
      body: {
        ids: flowIds,
      }
    }).then(result => result.docs)
  },
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
        aggs: {
          jobs: {
            "top_hits": {
              "sort": [{
                "jobDetails.creationDate": {
                  "order": "desc"
                }
              }],
              size: cursorInfo.first,
              "_source": {
                "includes": [ "jobDetails" ]
              },
            },
          }
        }
      }
    }).then(result => {
      return result.aggregations.jobs.hits.hits.map(hit => hit._source.jobDetails);
    })
  }
})

