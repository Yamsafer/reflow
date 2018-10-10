// /// <reference path="typings/globals.d.ts" />

// function flow(title: string, fn: any) {
//   return fn();
// }

// function getSuite(title: string) {
//   return title
// }

// function fork(titles: string[]) {
//   return titles
// }

// function getSubflow(title: string, evaluatedSubflow: string[]) {
//   return evaluatedSubflow
// }

// const getFlow = (flowMatrix: any[]) => flow("", function() {
//   return flowMatrix
// })

// describe("Matrix Generator", function() {
//   it("returns empty string", function() {
//     const emptyFlow = getFlow([]);
//     expect(emptyFlow).to.be.empty
//   })
//   it("returns flat suites", function() {
//     const suitesFlow = getFlow([
//       getSuite("suite 1")
//     ]);
//     expect(suitesFlow).to.deep.equal(["suite 1"]);
//   })
//   it("returns arrays on forks", function() {
//     const forkedFlow = getFlow([
//       getSuite("suite 1"),
//       fork([
//         getSuite("suite 2"),
//       ])
//     ]);
//     expect(forkedFlow).to.deep.equal(["suite 1", ["suite 2"]]);
//   })
//   it("returns flat subflow", function() {
//     const subflowFlow = getFlow([
//       getSubflow("subflow 1"),
//     ]);
//     expect(subflowFlow).to.deep.equal(["suite 1", ["suite 2"]]);

//   })
// })
