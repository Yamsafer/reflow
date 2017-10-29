describe('Suite C', function() {
  before(function() {
    console.log('before Suite C');
  })
  it('runs setup', function() {
    expect(global.bamieh).to.equal('bamieh!!');
  })
  it('does assertions', function() {
    expect(1).to.equal(1);
  })
})