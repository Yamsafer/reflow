const flowObjects = {};

const logger = global.logger || {
  debug: console.log.bind(console),
  silly: console.log.bind(console),
};

const flowGet = function (name, fallback) {
  const flowObject = flowObjects[name];
  if(flowObjects.hasOwnProperty(name)) return flowObject;
  if(typeof fallback !== 'undefined') return fallback;
  throw new Error(`cannot get flow["${name}"], no fallback provided.`);
};

const flowSetMuliple = function(setObj) {
  Object.entries(setObj).forEach(entry => {
    flowSet(...entry)
  })
}

const flowSet = function(name, value) {
  if(flowObjects.hasOwnProperty(name)) throw new Error(`cannot set flow["${name}"], value is already set.`);
  logger.silly(`Setting "${name}" in flow`);
  flowObjects[name] = value;
};

const flowUpdate = function(name, updater, defaultValue) {
  logger.debug(`Updating "${name}" in flow`);
  const currentValue = typeof flowObjects[name] === "undefined" ? defaultValue : flowObjects[name];
  flowObjects[name] = updater(currentValue);
  logger.debug(flowObjects[name])
}

const flowGetAll = () => flowObjects;


const flowTeardown = function() {
  logger.silly('Clearing flow variables.')
  Object.keys(flowObjects).forEach(key => {
    delete flowObjects[key];
  });
}


module.exports = {
  get: flowGet,
  getAll: flowGetAll,
  set: flowSet,
  update: flowUpdate,
  setMultiple: flowSetMuliple,
  teardown: flowTeardown,
}
