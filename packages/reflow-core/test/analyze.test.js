// import _ from 'lodash';
// import Reflow, {
//   lookupFiles,
//   loadModules,
//   dynamicRunner,
//   Module,
//   createContext,
// } from '../lib/reflow';
// import getConfigs from '../bin/configs';



// describe.only("Analyze", function() {
//   before(function() {
//     const config = {
//       files: [
//         './fixture/flows/**/*.js',
//         './fixture/subflow/**/*.js',
//         './fixture/suite/**/*.js',
//       ],
//       mocha: {
//         require: [],
//       },
//       numberOfThreads: 4,
//       tags: [],
//       mode: 'execute',
//       extensions: [],
//       recursive: false,
//     }

//     const reflow = new Reflow(config);

//     reflow.files = _(config.files)
//                     .flatMap(lookupFiles(__dirname, config))
//                     .compact()
//                     .value()

//     reflow.gatherMatrices()

//     this.reflow = reflow;
//   })
//   it.skip('generates a graphviz digraph', function() {
//     // this.reflow.analyzeFlows()
//     const analyzedMatrix = Object.values(this.reflow.flows).map(
//       this.reflow.analyze.bind(this.reflow)
//     ).map(matrix => matrix.analysis).find(Boolean);

//     // console.log('this.reflow', JSON.stringify(analyzedMatrix, 2, 2))
//   })
// })
