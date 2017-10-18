describe('Hooked Suite', function() {
  before(function() {
    console.log('before is called');
    this.value = 13;
  })
  it('Runs Cases', function() {
    expect(this.value).to.equal(13);
  })
})