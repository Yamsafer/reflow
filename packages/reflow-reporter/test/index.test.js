'use strict';

const reflowReporter = require('../');
const originalStdoutWrite = process.stdout.write.bind(process.stdout);

function callOn(eventType, payload) {
  return (event, callback) => {
    if (event === eventType) callback(payload);
  };
}

describe('Reflow Reporter', function () {
  let stdout;
  let runner;

  beforeEach(function () {
    stdout = [];
    runner = {
      suite: [],
      grepTotal: () => 0,
    };

    process.stdout.write = function (string) {
      stdout.push(string);
      originalStdoutWrite(`${string}\n`);
    };
  });

  describe('Start', function () {
    const reportIncludes = ['startTime', 'totalSuites', 'meta'];
    let startReport;
    const config = {
      reporterOptions: {
        batch: false,
      }
    };

    it('reports an object', function () {
      runner.on = callOn('start');
      reflowReporter.call({}, runner, config);

      startReport = JSON.parse(stdout[0])[0];
      expect(startReport).to.be.an('object');
    });

    it(`reports ${reportIncludes.join(', ')}`, function() {
      expect(startReport).to.have.all.keys(reportIncludes);
    });
  });

  describe('Continuous Reporting', function() {
    const config = {
      reporterOptions: {
        batch: false
      }
    };

    it('reports each event seperately', function() {
      runner.on = callOn('start');
      reflowReporter.call({}, runner, config);

      expect(stdout).to.have.length(1);
    })
  })

  describe('Batched Reporting', function() {
    const config = {
      reporterOptions: {
        batch: true
      }
    };

    it('is the default', function() {
      runner.on = callOn('start');
      reflowReporter.call({}, runner);

      expect(stdout).to.be.empty;
    })

    it('reports each event seperately', function() {
      runner.on = callOn('start');
      reflowReporter.call({}, runner, config);

      expect(stdout).to.be.empty;
    })
    it('reports all the results on end', function() {
      runner.on = callOn('end');
      reflowReporter.call({}, runner, config);
      expect(stdout).to.have.length(1);
    })
  })

  describe('End', function () {
    let endReport;
    const reportIncludes = [
      'status',
      'tests',
      'failures',
      'errors',
      'skipped',
      'endTime',
      'time',
      'meta',
    ];

    it('reports an object', function () {
      runner.on = callOn('end');
      reflowReporter.call({}, runner);

      endReport = JSON.parse(stdout[0])[0];
      expect(endReport).to.be.an('object');
    });


    it(`reports ${reportIncludes.join(', ')}`, function() {
      expect(endReport).to.have.all.keys(reportIncludes);
    });
  });

  describe.skip('Fail', function() {
    const expectedTitle = "Hi";

    it('reports an object', function() {
      const suite = {
        title: expectedTitle
      };

      runner.on = callOn('fail', suite);

      reflowReporter.call({}, runner);
      expect(stdout).to.be.empty;
    })
  })

});
