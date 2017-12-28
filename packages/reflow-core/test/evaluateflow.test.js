import {evaluateFlow} from '../lib/evaluate'


const createHook = function(name, condition) {
  return {
    name,
    type: 'hook',
    condition,
  }
}

describe.only('evaluate flow', function() {

  it('test evaluateFlow length', function() {
    const flow = [
      [
        createHook('s1', () => false),
        createHook('s2'),
      ],
    ];

    const combinations = evaluateFlow(flow);
    expect(combinations.length).to.equal(1);
  })
})
