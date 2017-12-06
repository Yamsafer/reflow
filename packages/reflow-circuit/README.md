# reflow|circuit


## Elastic

```
curl -XPUT 'localhost:9200/reflow/_mapping/flow?pretty' -H 'Content-Type: application/json' -d'
{"properties":{"endTime":{"type":"text","fields":{"keyword":{"type":"keyword","ignore_above":256}}},"jobDetails":{"properties":{"creationDate":{"type":"long"},"id":{"type":"text","fielddata": true,"fields":{"keyword":{"type":"keyword","ignore_above":256}}},"numberOfFlows":{"type":"long"},"numberOfThreads":{"type":"long"}}},"startTime":{"type":"text","fields":{"keyword":{"type":"keyword","ignore_above":256}}},"title":{"type":"text","fields":{"keyword":{"type":"keyword","ignore_above":256}}}}}
'
```
