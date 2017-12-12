flow('Reflow Matrix', function() {
  return [
    getHook('Before All', ['core']),
    getHook('After All', ['core']),

    getHook('Hook A', ['core']),
    getHook('Hook B', ['core']),

    fork([
      getHook('Hook C', ['core']),
      getHook('Hook B1', ['core']),
      // getHook('1 week from now'),
      // getHook('3 nights'),
    ]),
    getSuite('Suite A', ['core']),
    getHook('Hook A1', ['core']),
    getSuite('Suite B', ['core']),
    getSuite('Suite C', ['core']),

    getSubflow('Hooked Subflow'),
  ]
})
