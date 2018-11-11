import threadPool from '../lib/thread-pool';
import path from 'path';

describe('thread pools', function() {
  before(function() {
    this.workerPath = path.join(__dirname, './fixture/worker/index.js');
  });

  beforeEach(function() {
    this.pool = threadPool({
      threadsToSpawn: 1,
      workerPath: this.workerPath,
    });
  })

  afterEach(function() {
    this.pool.killAll();
  })

  it('creates a thread pool', function() {
    expect(this.pool).to.be.an('object');
  })

  describe('Configurations', function() {
    it('threadsToSpawn: Spawns x threads in the pool', function() {
      expect(this.pool.threads).to.have.length(1);
    })
    it('workerPath: Sets Worker path for the thread pool`', function() {
      expect(this.pool.runArgs).to.contain(this.workerPath);
    })
  })

  describe('execution', function() {
    it('executes worker', function(done) {
      let message
      this.pool.send(2);

      this.pool
        .on('done', function(job, message) {
          expect(job).to.not.be.undefined;
        })
        .on('finished', done);
    })
  })
})
