flow('Reflow Matrix', function() {
  return [
    getHook('Before All', ['core']),

    getHook('Hook A', ['core']),
    getHook('Hook B', ['core']),

    fork([
      getHook('Hook C', ['core']),
      // getHook('1 week from now'),
      // getHook('3 nights'),
    ]),
    getSuite('Suite A', ['core']),
    getHook('Hook A1', ['core']),
    getHook('Hook B1', ['core']),
    getSuite('Suite B', ['core']),


    // fork([
    //   getHook('Hook A', ['core']),
    //   getHook('Hook B', ['core']),
    // ]),
    // getSuite('Suite A', ['core']),
    // getSuite('Suite B', ['core']),
    // fork([
    //   getSuite('Suite C', ['core']),
    //   getSuite('Suite D', ['core']),
    // ]),
    // getSubflow('Basic Subflow'),
    // getSubflow('Conditional Subflow'),
    // getSubflow('Hooked Subflow'),
    getHook('After All', ['core']),
    // fork([
    //   getSuite('Suite B'),
    //   getSuite('Suite C'),
    // ]),
    // getSuite('Suite D'),
    // getSuite('Suite E'),
  ]
})