import randomModule from '../random-module';

describe('Suite A', function() {
  it('does assertions', function(done) {
    setTimeout(done, 500)
  })
  it('imports files', function() {
    expect(randomModule).to.be.a('function');
  })
})