flow('Reflow Matrix', function() {
  return [
    getSuite('Suite A', ['core']),
    getSuite('Suite B'),
    // fork([
    //   getHook('Hook A'),
    //   getHook('Hook B'),
    // ]),
    // fork([
    //   getSuite('Suite B'),
    //   getSuite('Suite C'),
    // ]),
    // getSuite('Suite D'),
    // getSuite('Suite E'),
  ]
})