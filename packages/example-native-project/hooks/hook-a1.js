hook("Hook A1", function() {
  return {
    after() {
      console.log('Hook A1 after!')
    }
  }
})