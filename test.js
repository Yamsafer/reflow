const _ = require('lodash');

const theTreeName = "Main Tree"
const theTree = {
  "name": "Main Tree",
  "before": "Main Before",
  "suites": [
    {
      "name": "hello mom",
      "type": "suite"
    },
    {
      "type": "subflow",
      "before": "subflow 1 Before",
      "name": "subflow 1",
      "suites": {
        "name": "im in subflow 1",
        "type": "suite"
      }
    },
    {
      "type": "subflow",
      "name": "subflow 2",
      "suites": {
        "type": "subflow",
        "before": "subflow 1 Before",
        "name": "subflow 1",
        "suites": {
          "name": "im in subflow 1",
          "type": "suite"
        }
      }
    },
    {
      "type": "subflow",
      "name": "A",
      "suites": {
        "name": "NOOP",
        "type": "suite"
      }
    }
  ],
};

const allSuites = {};

const describe = function(name, fn) {
  console.log('Calling Suite:', name);
  fn();
}

const executeSuite = ({name}) => {
  console.log("|  executing: ", name)
};

const executeTree = function(tree) {
  const treeName = tree.name;
  const suites = _.isArray(tree.suites)? tree.suites : [tree.suites];

  describe(treeName, function() {
    if (!!tree.before) {
      console.log("before:", tree.before)
    }

    suites.forEach(executeSuites);
  })
}

const executeSuites = function executeSuites(branch) {
  if(branch.type === "suite") {
    return executeSuite(branch);
  }

  return executeTree(branch);
}



executeTree(theTree);