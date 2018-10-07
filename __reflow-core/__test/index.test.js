// import reflow from '../lib'
// import {evaluateSubflow} from '../lib/evaluate'
// import cartesian from '../lib/cartesian';
// import analyzeTree from '../lib/analyze';

// describe('Registering a Subflows', function() {
//   it('is a function', function() {
//     expect(reflow.subflow).to.be.a('function');
//   })
//   it('contains no registered subflows', function() {
//     const currentSubflows = reflow.getSubflows();
//     expect(currentSubflows).to.be.an('object').and.to.be.empty;
//   })
//   it('registers subflow', function() {
//     const currentSubflows = reflow.getSubflows();
//     reflow.subflow('Subflow 1', function() {})

//     expect(currentSubflows).to.be.an('object').and.to.have.property('Subflow 1');
//   })
//   it('throws if subflow does not return object', function() {
//     reflow.subflow('invalid subflow', function() {

//     })
//     const getSuiteInvok = () => reflow.getSubflow('invalid subflow');
//     expect(getSuiteInvok).to.throw();

//   })


// });


// describe('getSuite', function() {
//   it('is a function', function() {
//     expect(reflow.getSuite).to.be.a('function');
//   })
//   it('returns an object', function() {
//     const suiteName = 'mockSuite';
//     const suite = reflow.getSuite(suiteName)
//     expect(suite).to.be.an('object');
//   })

// });

// describe('getSubflow', function() {
//   it('is a function', function() {
//     expect(reflow.getSubflow).to.be.a('function');
//   })

//   it('throws on attempting to get unregistered subflow', function() {
//     const invalidSubflowName = 'unregistered subflow';
//     const subflowInvok = () => reflow.getSubflow(invalidSubflowName);
//     expect(subflowInvok).to.throw(`Unable to get subflow "${invalidSubflowName}".`)

//   })

//   it('evaluates subflow', function() {
//     reflow.subflow('mock', function() {
//       return {
//         suites: [
//           reflow.getSuite('Normal Suite'),
//         ]
//       }
//     })
//     const suite = reflow.getSubflow('mock')
//     expect(suite).to.be.an('array');

//   })

// });


// // a suite must be an array
// // a fork must be an array of arrays
// // a subsuite must be integrated in the flow as a fork

// describe('fork', function() {
//   it('is a function', function() {
//     expect(reflow.fork).to.be.a('function');
//   })
//   it('forks suites')
//   it('forks subflows')
// })
// describe('cartesian', function() {
//   const Suite = ['Suite'];
//   const Fork = [Suite, Suite];

//   it('returns 1 path on one array', function() {
//     const cartesianed = cartesian(Suite, Suite, Suite);
//     expect(cartesianed).to.have.length.of(1)
//   })
//   it('returns forks two paths on nested arrays', function() {
//     const cartesianed = cartesian(Suite, Fork, Suite);
//     expect(cartesianed).to.have.length.of(2)
//   })
// });

// describe('Reflow', function() {
//   it('is a function', function() {
//     expect(reflow).to.be.a('function');
//   })

//   it('invokes a flow', function() {
//     const spyDetail = chai.spy(function() {
//       return { suites: [] }
//     });

//     reflow('testReflow', spyDetail)

//     expect(spyDetail).to.be.called.once;
//   })

//   it('throws if no object is returned from details', function() {
//     const invalidFlowName = 'invalid testReflow'
//     const reflowInvok = () => reflow(invalidFlowName, function() {
      
//     })
//     expect(reflowInvok).to.throw(`no suites provided in flow "${invalidFlowName}"`);
//   })
//   it('evaluates a flow', function() {
//     reflow.subflow('B subflow', function() {
//       return {
//         before: "before B Subflow",
//         suites: [
//           reflow.getSuite('B0'),
//           reflow.getSuite('B1'),
//           reflow.fork([
//             reflow.getSuite('B2'),
//             reflow.getSuite('B3'),
//           ]),
//         ]
//       }
//     })
    
//     reflow.subflow('D and E subflow', function() {
//       return {
//         hasCondition: true,
//         condition: branches => {
//           return branches
//             .filter(branch => branch.type === "subflow")
//             .find(branch => branch.name === "B subflow")
//             .suites
//             .some(subBranch => subBranch.name === "B3");
//         },
//         before: 'before D and E subflow',
//         suites: [
//           reflow.getSuite('D'),
//           reflow.getSubflow('E subflow'),
//         ]
//       }
//     })

//     reflow.subflow('E subflow', function() {
//       return {
//         suites: [
//           reflow.getSuite('E'),
//         ]
//       }
//     })

//     const flow = reflow('reflow', function() {
//       return {
//         suites: [
//           reflow.getSuite('A'),
//           reflow.getSubflow('B subflow'),
//           reflow.fork([
//             reflow.getSuite('C'),
//             reflow.getSubflow('D and E subflow'),
//           ]),
//         ],
//       }
//     });

//     const analysisTree = analyzeTree('Reflow', flow);

//     console.log(analysisTree.join('\n'))
//     // console.log('flow::')
//     // console.log(JSON.stringify(flow,2,2))

//   })
// });


