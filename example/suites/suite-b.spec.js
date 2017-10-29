describe('Suite B', function() {
  before(function() {
    console.log('Suite B before');
  })
  after(function() {
    console.log('Suite B After');
  })
  it('does B assertions', function() {
    expect(1).to.equal(2);
  })
})