flow("withSubflow", function() {
  return [
    getSubflow("Subflow 1"),
    getSuite("Suite 2"),
  ]
})
