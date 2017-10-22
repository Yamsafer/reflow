const reflow = require('../../distribution').default;

reflow.subflow("Basic Subflow", function() {
  return {
    before() {
      console.log('Before Basic Subflow.')
      // reflow.set('name', 'bamieh')
    },
    suites: [
      reflow.getSuite('Suite D'),
    ]
  }
})