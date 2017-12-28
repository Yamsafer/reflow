import reflowServer from '../lib';

describe('Server', function() {
  it('returns an express server', function() {
    const app = reflowServer();
    expect(app).to.be.a('function');
  });


  it('lifts a server', function(done) {
    const app = reflowServer();
    const agent = request.agent(reflowServer());

    agent
      .get('/')
      .expect(200)
      .end(done);
  });
})
