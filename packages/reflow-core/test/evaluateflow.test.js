import {evaluateFlow} from '../lib/evaluate'


const createSuite = function(name, condition) {
  return {
    name, 
    type: 'suite',
    condition,
  }
}

describe.only('evaluate flow', function() {

  it('evaluates Flow', function() {
    const suites = [
       [
      createSuite('s1a', () => false),
      createSuite('s1b'),
      ],
      [
    createSuite('s2a'),
      createSuite('s2b'),
      ],
      createSuite('s3'),
      createSuite('s4'),
    ]

    evaluateFlow(suites);
  })
})