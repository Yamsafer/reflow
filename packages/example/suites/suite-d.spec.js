describe('Suite D', function() {
  it('does assertions', function() {
    expect(1).to.equal(1);
    return new Promise((resolve, reject) => {
      setTimeout(resolve, 600)
    })
  })
})