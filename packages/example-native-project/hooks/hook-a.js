hook("Hook A", function() {
  return {
    before() {
      console.log('Hook A Before!')
    }
  }
})