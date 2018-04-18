hook("Before All", function() {
  return {
    beforeAll() {
      console.log('Before All!')
    }
  }
})