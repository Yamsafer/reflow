const globalID = require('../../util/global-id');

const testNode = test => ({
  id: globalID.encode('test', test.test_id.toJSON()),
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
    return new Promise((resolve, reject) => {
      models.instance.suitesByCombinationId.find({
        combination_id: models.datatypes.Long.fromString(combinationID),
      }, {
        select: [
          'suite_id',
          'title',
          'level',
          'tests',
        ],
      }, (err, suites) => {
        if(err) return reject(err);
        console.log('suites::', suites)
        const result = suites.map(row => ({
          node: {
            id: globalID.encode('suite', row.combination_id.toJSON()),
            title: row.title,
            level: row.level,
            tests: row.tests.map(testNode),
          }
        }));
        resolve(result);
      })
    });
  },
})
