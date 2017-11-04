import randomModule from '../random-module';

describe('Suite A', function() {
  before(function() {
    console.log('SUITE A BEFORE!')
  })
  it('does assertions', function(done) {
    setTimeout(done, 500)
  })
  it('imports files', function() {
    expect(randomModule).to.be.a('function');
  })
  // it('fails', function() {
  //   expect(1).to.equal(2)
  // })
})