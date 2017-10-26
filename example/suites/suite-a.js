describe('Suite A', function() {
  before(function() {
    console.log('hello world!!')
  })
  it('does assertions', function(done) {
    setTimeout(_ => {
      console.log('im called')
      expect(1).to.equal(1);
      done()
    }, 800)
  })
})