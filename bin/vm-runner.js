const vm = require('vm')
const path = require('path')
const NativeModule = module.constructor;
const resolve = require('resolve')


const DEFAULT_CONTEXT_KEY = '__REFLOW_CONTEXT__'


function createSandbox(context, CONTEXT_KEY=DEFAULT_CONTEXT_KEY) {
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
    [CONTEXT_KEY]: context
  }
  sandbox.global = sandbox
  return sandbox
}


function compileModule(files, basedir, runInNewContext) {
  const compiledScripts = {}
  const resolvedModules = {}

  function getCompiledScript(filename) {
    if (compiledScripts[filename]) {
      return compiledScripts[filename]
    }
    const code = files[filename]
    console.log('about to run the code!')
    const wrapper = NativeModule.wrap(code)
    const script = new vm.Script(wrapper, {
      filename,
      displayErrors: true
    })
    console.log('code ran!')
    compiledScripts[filename] = script
    return script
  }

  function evaluateModule(filename, sandbox, evaluatedFiles = {}) {
    if (evaluatedFiles[filename]) {
      return evaluatedFiles[filename]
    }

    const script = getCompiledScript(filename)
    const compiledWrapper = runInNewContext === false
      ? script.runInThisContext()
      : script.runInNewContext(sandbox)
    const m = {exports: {}}
    const r = file => {
      file = path.join('.', file)
      console.log('file:::', file)
      if (files[file]) {
        return evaluateModule(file, sandbox, evaluatedFiles)
      } else if (basedir) {
        return require(
          resolvedModules[file] ||
          (resolvedModules[file] = resolve.sync(file, {basedir}))
        )
      } else {
        console.log('required!')
        return require(file)
      }
    }
    compiledWrapper.call(m.exports, m.exports, r, m)

    const res = Object.prototype.hasOwnProperty.call(m.exports, 'default')
      ? m.exports.default
      : m.exports
    evaluatedFiles[filename] = res
    return res
  }

  return evaluateModule
}

module.exports = compileModule