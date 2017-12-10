# reflow|circuit


## Elastic

```
curl -XPUT 'localhost:9200/reflow/_mapping/flow?pretty' -H 'Content-Type: application/json' -d'
{"properties":{"endTime":{"type":"text","fields":{"keyword":{"type":"keyword","ignore_above":256}}},"jobDetails":{"properties":{"creationDate":{"type":"long"},"id":{"type":"text","fielddata": true,"fields":{"keyword":{"type":"keyword","ignore_above":256}}},"numberOfFlows":{"type":"long"},"numberOfThreads":{"type":"long"}}},"startTime":{"type":"text","fields":{"keyword":{"type":"keyword","ignore_above":256}}},"title":{"type":"text","fields":{"keyword":{"type":"keyword","ignore_above":256}}}}}
'
```



## GraphQL

[Example Queries](http://localhost:3000/graphiql?query=query%20getJobs%20%7B%0A%20%20jobs(first%3A%205)%20%7B%0A%20%20%20%20result%0A%20%20%20%20startTime%0A%20%20%20%20targetBranch%0A%20%20%20%20trigger%0A%20%20%20%20pageInfo%20%7B%0A%20%20%20%20%20%20total%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A%0Aquery%20getSuites%20%7B%0A%20%20combination(id%3A%20%2213%22)%20%7B%0A%20%20%20%20pending%0A%20%20%20%20passes%0A%20%20%20%20failures%0A%20%20%20%20suites(first%3A%2010)%20%7B%0A%20%20%20%20%20%20title%0A%20%20%20%20%20%20id%0A%20%20%20%20%20%20tests%20%7B%0A%20%20%20%20%20%20%20%20title%0A%20%20%20%20%20%20%20%20body%0A%20%20%20%20%20%20%20%20result%0A%20%20%20%20%20%20%20%20speed%0A%20%20%20%20%20%20%20%20duration%0A%20%20%20%20%20%20%20%20id%0A%20%20%20%20%20%20%20%20err%20%7B%0A%20%20%20%20%20%20%20%20%20%20htmlMessage%0A%20%20%20%20%20%20%20%20%20%20stack%0A%20%20%20%20%20%20%20%20%20%20message%0A%20%20%20%20%20%20%20%20%20%20sourceURL%0A%20%20%20%20%20%20%20%20%20%20line%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0A%0Aquery%20getCombinations%20%7B%0A%20%20flow(id%3A%20%2213%22)%20%7B%0A%20%20%20%20title%0A%20%20%20%20result%0A%20%20%20%20passes%0A%20%20%20%20pending%0A%20%20%20%20failures%0A%20%20%20%20combinations%20%7B%0A%20%20%20%20%20%20id%0A%20%20%20%20%20%20combinationNumber%0A%20%20%20%20%20%20result%0A%20%20%20%20%20%20passes%0A%20%20%20%20%20%20pending%0A%20%20%20%20%20%20failures%0A%20%20%20%20%20%20startTime%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0Aquery%20getJob%7B%0A%20%20job(id%3A%20%2287800621-4bdc-42a5-9c78-0f12f484da16%22)%7B%0A%20%20%20%20flows%20%7B%0A%20%20%20%20%20%20id%0A%20%20%20%20%20%20title%0A%20%20%20%20%7D%0A%20%20%7D%0A%7D%0Aquery%20getFlows%20%7B%0A%20%20flow(id%3A%20%2213%22)%20%7B%0A%20%20%20%20id%0A%20%20%20%20title%0A%20%20%7D%0A%7D&operationName=getCombinations)
