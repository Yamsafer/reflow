hook("Hook B", function() {
  return {
    before() {
      console.log('Hook B Before!')
    }
  }
})