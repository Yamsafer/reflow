flow("withForks", function() {
  return [
    fork([
      getSubflow("Subflow 1"),
      getSuite("Suite 2"),
    ]),
    getSuite("Suite 3"),
  ]
})
