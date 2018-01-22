hook("Hook B1", function() {
  return {
    after() {
      console.log('Hook B1 after!')
    }
  }
})