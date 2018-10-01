const flowObjects: any = {};

export
const get = function (name: string, fallback: any) {
  const flowObject = flowObjects[name];
  if(flowObjects.hasOwnProperty(name)) return flowObject;
  if(typeof fallback !== 'undefined') return fallback;
  throw new Error(`cannot get flow["${name}"], no fallback provided.`);
};

export
const getAll = () => flowObjects;

export
const setMuliple = function(setObj: {[key: string]: any}) {
  Object.entries(setObj).forEach(([name, value]) => set(name, value))
}

export
const set = function(name: string, value: any) {
  if(flowObjects.hasOwnProperty(name)) throw new Error(`cannot set flow["${name}"], value is already set.`);
  flowObjects[name] = value;
};

export
type UpdaterFunction = (currentValue: string) => any

export
const update = function(name: string, updater: UpdaterFunction, defaultValue?: any) {
  const currentValue = typeof flowObjects[name] === "undefined" ? defaultValue : flowObjects[name];
  flowObjects[name] = updater(currentValue);
}

export
const teardown = function() {
  Object.keys(flowObjects).forEach(key => delete flowObjects[key]);
}

