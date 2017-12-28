import {evaluateFlow} from '../lib/evaluate'


const createHook = function(name, condition) {
  return {
    name,
    type: 'hook',
    condition,
  }
}

describe('Evaluate flow', function() {
  describe('Conditional Forking', function() {
    it('removes false predicates from forks', function() {
      const actualFlow = [
        [
          createHook('s1', () => false),
          createHook('s2'),
          createHook('s3'),
        ],
      ];

      const expectedFlow = [
        [
          createHook('s2'),
          createHook('s3'),
        ],
      ];

      const actualCombinations = evaluateFlow(actualFlow);
      const expectedCombinations = evaluateFlow(expectedFlow);

      expect(actualCombinations).to.have.lengthOf(2);
      expect(actualCombinations).to.deep.equal(expectedCombinations);
    });
  });
});
