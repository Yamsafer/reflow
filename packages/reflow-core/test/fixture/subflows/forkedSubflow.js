subflow("Forked Subflow", function() {
  return {
    suites: [
      getSuite("Suite 1"),
      fork([
        getSuite("Suite 2"),
        getSuite("Suite 3"),
      ])
    ],
  }
})
