flow("withSubflows", function() {
  return [
    getSubflow("Subflow 1"),
    getSuite("Suite 2"),
  ]
})
