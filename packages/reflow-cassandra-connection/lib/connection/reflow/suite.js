const selectCQL = `
  SELECT
    suite_id,
    title,
    level,
    tests
  FROM suites_by_combination_id WHERE combination_id = ?
  GROUP BY combination_id ORDER BY suite_id DESC;`;

module.exports = client => ({
  getByCombinationID(combinationID, cursorInfo) {
    return client
      .execute(selectCQL, [combinationID])
      .then(result => {
        return result.rows.map(row => {
          return {
            node: {
              id: row.suite_id.toJSON(),
              title: row.title,
              level: row.level,
              tests: row.tests.map(test => ({
                id: test.test_id.toJSON(),
                title: test.title,
                result: test.result,
                speed: test.speed,
                duration: test.duration,
                code: test.code,
                err: test.err,
                metadata: test.metadata,
              })),
            }
          }
        })
      });
  },
})
