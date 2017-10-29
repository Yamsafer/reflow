flow('Reflow Matrix', function() {
  return [
    getHook('Before All', ['core']),
    fork([
      getHook('Hook A', ['core']),
      getHook('Hook B', ['core']),
    ]),
    getSuite('Suite A', ['core']),
    getSuite('Suite B', ['core']),
    fork([
      getSuite('Suite C', ['core']),
      getSuite('Suite D', ['core']),
    ]),
    getHook('Hook A1', ['core']),
    getHook('Hook B1', ['core']),
    getSubflow('Basic Subflow'),
    getSubflow('Conditional Subflow'),
    getHook('After All', ['core']),
    // fork([
    //   getSuite('Suite B'),
    //   getSuite('Suite C'),
    // ]),
    // getSuite('Suite D'),
    // getSuite('Suite E'),
  ]
})