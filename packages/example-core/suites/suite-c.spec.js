describe('Suite C', function() {
  before(function() {
    console.log('I AM IN SUITE C!!!!!!!!!!!');
    return new Promise((resolve, reject) => {
      setTimeout(resolve, 600)
    })
  })
  it('does assertions', function() {
    console.log('hello world i am')
    metadata('inside test C','info')

   metadata({'hi': 'lol'})
    expect(1).to.equal(1);
  })
})
