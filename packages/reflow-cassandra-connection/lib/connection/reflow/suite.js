const globalID = require('../../util/global-id');

const testNode = test => ({
  // id: globalID.encode('test', test.test_id.toJSON()),
  title: test.title,
  result: test.result,
  speed: test.speed,
  duration: test.duration,
  code: test.code,
  err: test.err,
  metadata: test.metadata,
});

module.exports = models => ({
  getByCombinationID(encodedCombinationID, cursorInfo) {
    const combinationID = globalID.decode(encodedCombinationID).id;
    return models.instance.suitesByCombinationId.findAsync({
        combination_id: models.datatypes.Long.fromString(combinationID),
      }, {
        select: [
          'suite_id',
          'title',
          'level',
          'tests',
        ],
      }).then(suites => {
        return suites.map(suite => ({
          node: {
            id: globalID.encode('suite', suite.suite_id.toJSON()),
            title: suite.title,
            level: suite.level,
            tests: suite.tests && suite.tests.map(testNode),
          }
        }));
    });
  },
})
