hook("After All", function() {
  return {
    afterAll() {
      console.log('After All!')
    }
  }
})