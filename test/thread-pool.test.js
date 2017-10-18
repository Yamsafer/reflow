import threadPool from '../src/thread-pool';
import path from 'path';

describe('thread pools', function() {
  before(function() {
    this.workerPath = path.join(__dirname, './fixture/mock-worker.js');
  });

  it('creates a thread pool', function() {
    const pool = threadPool();
    expect(pool).to.be.an('object');
  })

  describe('Configurations', function() {
    it('threadsToSpawn: Spawns x threads in the pool', function() {
      const pool = threadPool({
        threadsToSpawn: 1,
      });

      expect(pool.threads).to.have.length(1);
    })
    it('workerPath: Sets Worker path for the thread pool`', function() {
      const pool = threadPool({
        workerPath: this.workerPath,
      });
      expect(pool.runArgs).to.contain(this.workerPath);
    })
  })

  describe('execution', function() {
    before(function() {
      this.pool = threadPool({
        threadsToSpawn: 1,
        workerPath: this.workerPath,
      });
    })
    it('executes worker', function(done) {
      const pool = this.pool;
      pool.send(2);

      pool
        .on('done', function(job, message) {
          expect(job).to.not.be.undefined;
        })
        .on('finished', function() {
          pool.killAll();
          done()
        });      
    })
  })
})
