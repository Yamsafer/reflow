flow('Reflow Matrix', _ => [
  getSuite('Hooked Suite'),
  getSubflow('Basic Subflow'),
  fork([
    getSuite('Suite A'),
    getSuite('Suite B'),
  ]),
  getSuite('Suite C'),
])
