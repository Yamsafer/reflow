module.exports = client => ({
  getJobs(projectID, cursorInfo) {
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

        return {
          ...jobDetails,
          numberOfSuites: totalNumberOfSuites,
          result: getResult(),
        }
      });
    }
  },
})
