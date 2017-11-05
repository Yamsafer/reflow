subflow("Basic Subflow", function() {
  return {
    before() {
      console.log('Before Basic Subflow.')
      // reflow.set('name', 'bamieh')
    },
    suites: [
      getSuite('Standard Suite'),
    ]
  }
})
