describe('Suite C', function() {
  before(function() {
    console.log('before Suite C');
    return new Promise((resolve, reject) => {
      setTimeout(resolve, 600)
    })
  })
  it('does assertions', function() {
    expect(1).to.equal(1);
  })
})