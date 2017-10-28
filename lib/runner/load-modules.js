import Module from './Module';

function load(file, parent) {
  if (!file) return parent;

  const module = new Module(file, parent);
  module.load(file);
  module.run(file);
  return module;
}

const resolve = require => name => {
  try {
    return require.resolve(name);
  } catch (e) {
    if (e.code === 'MODULE_NOT_FOUND') {
      return name;
    }
    throw e;
  }
}


export default function loadModules(require, files) {
  return files
    .map(resolve(require))
    .reduce((module, file) => load(file, module), null);
}