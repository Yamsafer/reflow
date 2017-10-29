hook("Hook B", function() {
  return {
    before() {
      reflow.set('item', 2)
      console.log('Hook B Before!')
    }
  }
})