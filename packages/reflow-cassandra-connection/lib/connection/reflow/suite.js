const globalID = require('../../util/global-id');

const selectCQL = `
  SELECT
    suite_id,
    title,
    level,
    tests
  FROM suites_by_combination_id WHERE combination_id = ?
  GROUP BY combination_id ORDER BY suite_id DESC;`;

const graphQLTestSchema = test => ({
  id: globalID.encode('test', test.test_id.toJSON()),
  title: test.title,
  result: test.result,
  speed: test.speed,
  duration: test.duration,
  code: test.code,
  err: test.err,
  metadata: test.metadata,
});

module.exports = client => ({
  getByCombinationID(encodedCombinationID, cursorInfo) {
    const combinationID = globalID.decode(encodedCombinationID).id;
    return client
      .execute(selectCQL, [combinationID])
      .then(result => {
        return result.rows.map(row => ({
          node: {
            id: globalID.encode('suite', row.combiantion_id.toJSON()),
            title: row.title,
            level: row.level,
            tests: row.tests.map(graphQLTestSchema),
          }
        }))
      });
  },
})
