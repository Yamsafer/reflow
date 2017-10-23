const reflow = require('../distribution').default;
const path = require('path');
const suites = ['a', 'b', 'c', 'd', 'e'];


suites.forEach(suiteAlph => {
  const suitePath = path.join(__dirname, `./suites/suite-${suiteAlph}.js`);
  reflow.registerSuitePath(`Suite ${suiteAlph.toUpperCase()}`, suitePath);
})


reflow.subflow("Basic Subflow", function() {
  return {
    before() {
      console.log('Before Basic Subflow.')
      reflow.set('name', 'bamieh')
    },
    suites: [
      reflow.getSuite('Suite D'),
    ]
  }
})

reflow.subflow("Conditional Subflow", function() {
  return {
    condition(branches) {
      return branches.some(branch => branch.name === "Suite C")
    },
    suites: [
      reflow.getSuite('Suite E'),
    ]
  }
})


reflow('Reflow Matrix', function() {
  return {
    before() {
      console.log('before All')
      // reflow.set('hi', 13)
    },
    suites: [
      reflow.getSuite('Suite A'),
      reflow.fork([
        reflow.getSuite('Suite B'),
        reflow.getSuite('Suite C'),
      ]),
      reflow.getSubflow('Basic Subflow'),
      reflow.getSubflow('Conditional Subflow'),
    ]
  }
})