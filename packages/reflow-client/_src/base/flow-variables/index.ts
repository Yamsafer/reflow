type flowValue = any;
type flowKey = string;
type flowVariable = {flowKey: flowValue}

interface updater<T> {
  (currentValue: T) : T
}

export
const flowVaribles = {
  get(name: flowKey, fallback: flowValue) {
    const flowObject = this.singleton[name];
    if(this.singleton.hasOwnProperty(name)) return flowObject;
    if(typeof fallback !== 'undefined') return fallback;
    throw Error(`cannot get flow["${name}"], no fallback provided.`);
  },
  getAll() {
    return this.singleton
  },
  set(items: flowVariable) {
    Object.entries(items).forEach(([name, value]) => {
      if(this.singleton.hasOwnProperty(name)) throw new Error(`cannot set flow["${name}"], value is already set.`);
      this.silly(`Setting "${name}" in flow`);
      this.singleton[name] = value;
    })
  },
  update(name: flowKey, updater: updater<flowValue>, defaultValue: flowValue) {
    this.debug(`Updating "${name}" in flow`);
    const currentValue = typeof this.singleton[name] === "undefined" ? defaultValue : this.singleton[name];
    this.singleton[name] = updater(currentValue);
    this.debug(this.singleton[name])
  },
  teardown() {
    this.silly('Clearing flow variables.')
    Object.keys(this.singleton).forEach(key => {
      delete this.singleton[key];
    });
  },
};
