hook("Hook C", function() {
  return {
    before() {
      console.log('Hook C Before!')
      return new Promise(resolve => {
        setTimeout(resolve, 200);
      })
    }
  }
})