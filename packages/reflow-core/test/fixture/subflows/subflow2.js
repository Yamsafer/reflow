subflow("Subflow 2", function() {
  return {
    suites: [
      getSuite("Suite 2"),
      getSuite("Suite 3"),
    ],
  }
})
