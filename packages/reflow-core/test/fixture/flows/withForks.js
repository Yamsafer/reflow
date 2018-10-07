flow("withForks", function() {
  return [
    getSuite("Suite 2"),
    fork([
      getSubflow("Subflow 1"),
      getSuite("Suite 3")
    ]),
  ]
})
