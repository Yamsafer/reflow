flow('Reflow Matrix', function() {
  return [
    getSuite('Suite A'),
    fork([
      getHook('Hook A'),
      getHook('Hook B'),
    ]),
    getSuite('Suite B'),
  ]
})