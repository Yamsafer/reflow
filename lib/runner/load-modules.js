import Module from './Module';

function load(file, parent) {
  if (!file) return parent;

  const module = new Module(file, parent);
  module.load(file);
  module.run(file);
  return module;
}



export default function loadModules(files) {
  return files.reduce((module, file) => load(file, module), null);
}