require('babel-register')();
const MochaReflow = require('./mocha-reflow').default;
const loadModules = require('./runner/load-modules').default;
const intercept = require("intercept-stdout");
const path = require('path');

let vmRunner;
let mochaReflowInstance;

const typesToPush = ["suite", "hook"];

const pushToMocha = ({ path }) => {
  mochaReflowInstance.files.push(path);
};

const executeSubTree = function(tree) {
  const suites = [].concat(tree.suites);
  suites.forEach(executeSuites);
}

const executeSuites = function(branch) {
  if(typesToPush.includes(branch.type)) {
    return pushToMocha(branch);
  }

  return executeSubTree(branch);
}

const getCursorX = function(stdoutCapture) {
  try {
    const lastStdout = stdoutCapture[stdoutCapture.length-1];
    return lastStdout.text.match(/^(\s*)\S/m)[1] || "";
  } catch(err) {
    return "";
  }
}

const executeTree = function({tree, mochaConfig}, done) {
  const stdoutCapture = [];

  const unhook_intercept = intercept(function(text) {
    // const spacing = getCursorX(stdoutCapture);
    // console.log('spacing::', spacing)
    stdoutCapture.push({
      workerIndex: tree.index,
      text: `${spacing}${text}`,
    })
    return ""
    // return "" + spacing.length
    // return ">" + text + "< (" + spacing.length + ")";
    // return "spacing: "+spacing.length;
  });

  const {
    require: mochaRequiredFiles,
    ...mochaRestConfigs
  } = mochaConfig


  const mochaReflowConfig = Object.assign({}, mochaRestConfigs, {
    environment: loadModules(mochaRequiredFiles),
    ui: 'reflow-bdd',
    // reporter: function() {

    // },
  });
  

  mochaReflowInstance = new MochaReflow(mochaReflowConfig);
  
  const suites = [].concat(tree.suites);
  
  suites.forEach(executeSuites);

  mochaReflowInstance.run(failures => {
    unhook_intercept();
    const stdoutText = stdoutCapture.map(capture => capture.text).join("");
    console.log(stdoutText)
    done(failures)
  }) 
}




module.exports = executeTree