#!/usr/bin/env node
const path = require('path');
const reflow = require('../distribution/index.js');

const subflowPath = path.resolve(__dirname, '../example/subflow/basic.js');
const flowPath = path.resolve(__dirname, '../example/flow/index.js');
const suitesPath = path.resolve(__dirname, '../example/suites/suite-a.js');


const describe = function() {
  console.log('ok!')
}
function createSandbox(context, CONTEXT_KEY) {
  const sandbox = {
    Buffer,
    console,
    process,
    setTimeout,
    setInterval,
    setImmediate,
    clearTimeout,
    clearInterval,
    clearImmediate,
    describe,
  }
  if(CONTEXT_KEY) sandbox[CONTEXT_KEY] = context;

  sandbox.global = sandbox
  return sandbox
}


const code = `
(function(require, suite) {

  console.log('describe::', describe)
  require(suite)
  console.log('hello')
})`;

const vm = require('vm');
const NativeModule = module.constructor;
// const wrapper = NativeModule.wrap(code);
const wrapper = code;



const sandbox = createSandbox();

// const script = vm.runInNewContext(code, sandbox);
const script = new vm.Script(wrapper, {
  filename: suitesPath,
  displayErrors: true,
})

const compiledWrapper = script.runInNewContext(sandbox);

console.log('compiledWrapper:', compiledWrapper)
compiledWrapper(require, suitesPath)

// compiledWrapper.call(m.exports, m.exports, r, m)


// const suites = [suitesPath]

// require(suitesPath)

// suites.forEach(suite => {

//   const suitePath = path.join(__dirname, `./suites/suite-${suiteAlph}.js`);
//   reflow.registerSuitePath(`Suite ${suiteAlph.toUpperCase()}`, suitePath);
// })
