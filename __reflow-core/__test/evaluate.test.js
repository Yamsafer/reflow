import {evaluateSubflow} from '../lib/evaluate'


const createSuite = function(name) {
  return {
    name, 
    type: 'suite',
  }
}


describe.only('evaluate subflow', function() {
  it('is a function', function() {
    expect(evaluateSubflow).to.be.a('function');
  })
  it('invokes subflow detail', function() {
    const spyDetail = chai.spy(function() {
      return {
        suites: []
      }
    });

    evaluateSubflow('subflowMock', spyDetail);
    expect(spyDetail).to.be.called.once;
  })


  describe('Suites', function() {
    beforeEach(function() {
      this.subflowName = "subflowMock";
      this.subflowDetail = function() {
        return {
          suites: [
            createSuite('Suite 1'),
            createSuite('Suite 2'),
            [
              createSuite('Suite 2A'),
              createSuite('Suite 2B'),
            ],
          ],
        }
      };

      this.evaluatedSubflow = evaluateSubflow(this.subflowName, this.subflowDetail);
    })
    it('returns an array of objects', function() {
      expect(this.evaluatedSubflow).to.be.an('array')
      this.evaluatedSubflow.forEach(subflowFork => {
        expect(subflowFork).to.be.an('object');
      })

    });

    it('puts the name of the suite inside each fork', function() {
      this.evaluatedSubflow.forEach(subflowFork => {
        expect(subflowFork.name).to.equal(this.subflowName)
      })
    })
  })

  // describe('Subflows', function() {
  //   it('returns an array', function() {

  //     reflow.subflow('Nested Subflow', function() {
  //       return {
  //         suites: [
  //           reflow.getSuite('Normal Suite'),
  //         ]
  //       }
  //     })

  //     const detail = function() {
  //       return {
  //         suites: [
  //           reflow.getSubflow('Nested Subflow'),
  //           reflow.getSubflow('Nested Subflow'),
  //         ],
  //       }
  //     };

  //     const evaluatedSubflow = evaluateSubflow('subflowMock', detail);
  //     expect(evaluatedSubflow).to.be.an('array')
  //     // console.log('evaluatedSubflow::', evaluatedSubflow)
  //   });
  // })
})
