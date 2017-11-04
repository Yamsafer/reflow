import server from '../lib';

describe('Analytics Server', function() {
  before(function() {
    this.app = server();
    this.request = supertest(this.app);
  })
  it('returns an express server', function() {
    console.log(this.request)
  })
  it('lifts a server', function(done) {
    this.request
      .get('/')
      .expect('Content-Type', /json/)
      .expect(200, done);
  })
})