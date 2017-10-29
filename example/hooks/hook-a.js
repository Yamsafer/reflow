hook("Hook A", function() {
  return {
    before() {
      reflow.set('item', 1)
      console.log('Hook A Before!')
    }
  }
})