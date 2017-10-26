hook("Hook C", function() {
  return {
    before() {
      console.log('Hook C Before!')
    }
  }
})