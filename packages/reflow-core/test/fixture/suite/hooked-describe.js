describe('Hooked Suite', function() {
  before(function() {
    console.log('Hooked Suite before called.');
    this.value = 13;
  })
  it('Runs Cases', function() {
    expect(this.value).to.equal(13);
    console.log('Hooked Suite Case Invoked.')
  })
})