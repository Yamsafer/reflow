subflow("Conditional Subflow", function() {
  return {
    condition: branches => {
      return branches
        .filter(branch => branch.type === 'suite')
        .some(branch => branch.name === 'Suite C')
    },
    suites: [
      getSuite('Suite E', ['core']),
    ]
  }
})