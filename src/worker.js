const executeSuite = ({ name }) => {
  // const suiteDescriptor = allSuites[name];
  const suitePath = getSuiteDefinition(name)

  if (!suitePath)
    throw new Error(`no suites specified in flow "${name}".`);

  // if(name === "NOOP") {
  //   return suiteDescriptor();
  // }
  return mochaReflowInstance.addFile(suitePath);
  // describe(name, suiteDescriptor);
};


const mochaConfig = {
  reporter: function() {

  }
}

const runReflowInstance = function () {
  return new Promise((resolve, reject) => {
    mochaReflowInstance.run(function(failures) {
      if(failures) return reject(failures);
      resolve();
    })
  })
}
const executeTree = function(tree) {
  const treeName = tree.name;
  if(tree.type === "fork") {
    console.log('forking: ', treeName)
    mochaReflowInstance = new MochaRefow(tree, mochaConfig)
  }

  // const suites = _.isArray(tree.suites)? tree.suites : [tree.suites];
  const suites = [].concat(tree.suites);
  

  // suites.forEach(branch => {
  //   const suitePath = getSuiteDefinition(treeName)
  //   mochaReflowInstance.addFile(suitePath);
  // })
  suites.forEach(executeSuites);


  return mochaReflowInstance
  // describe(treeName, function() {
  //   executeMochaHooks(tree)
  //   suites.forEach(executeSuites);
  // })
}

const executeSuites = function(branch) {
  if(branch.type === "suite") {
    // console.log('branch::', branch)
    return executeSuite(branch);
  }

  return executeTree(branch);
}




function minmax(int, done) {
  // mochaReflowInstance.run(done)
  console.log('hi!')
  if (typeof this.min === 'undefined') {
    this.min = int;
    this.max = int;
  } else {
    this.min = Math.min(this.min, int);
    this.max = Math.max(this.max, int);
  }
  done({
    min : this.min,
    max : this.max
  });
}

module.exports = minmax