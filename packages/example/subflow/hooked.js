subflow("Hooked Subflow", function() {
  return {
    suites: [
      getHook('Hook C', ['core']),
      getSuite('Suite E', ['core']),
    ]
  }
})