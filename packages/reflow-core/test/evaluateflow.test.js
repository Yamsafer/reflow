import {evaluateFlow} from '../lib/evaluate'


const createSuite = function(name, condition) {
  return {
    name,
    type: 'suite',
    condition,
  }
}

describe.only('Evaluate flow', function() {
  describe('Conditional Forking', function() {
    it('removes false predicates from forks', function() {
      const suites = [
        [
          createSuite('s1', () => false),
          createSuite('s2'),
        ],
      ]
      expect(evaluateFlow(suites).length).to.equal(1);
    })
  })
})
