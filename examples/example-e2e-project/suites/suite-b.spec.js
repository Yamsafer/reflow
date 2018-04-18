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
    metadata({'a':3,'b':'test','c':{'cc':true}}, {level: 'warn'})
    metadata(1);
    return new Promise((resolve, reject) => {
      expect(1).to.equal(1);
      setTimeout(resolve, 600)
    })
  })
})
