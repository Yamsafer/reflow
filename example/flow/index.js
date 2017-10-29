flow('Reflow Matrix', function() {
  return [
    getSuite('Suite A', ['core']),
    getHook('Hook A', ['core']),
    getSuite('Suite B', ['core']),
    getHook('Hook A1', ['core']),
    // getSubflow('Basic Subflow'),
    // fork([
    //   getSuite('Suite C', ['core']),
    //   getSuite('Suite D', ['core']),
    //   // getHook('Hook B'),
    // ]),
    // fork([
    //   getSuite('Suite B'),
    //   getSuite('Suite C'),
    // ]),
    // getSuite('Suite D'),
    // getSuite('Suite E'),
  ]
})