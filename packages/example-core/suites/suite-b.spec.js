describe('Suite B', function() {
  before(function() {
    console.log('Suite B before');
  })
  after(function() {
    return new Promise((resolve, reject) => {
      console.log('Suite B After');
      setTimeout(resolve, 600)
    })
  })
  it('does B assertions', function() {
    return new Promise((resolve, reject) => {
      expect(1).to.equal(1);
      setTimeout(resolve, 600)
    })
  })
})
