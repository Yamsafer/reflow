type UpdaterFunction = (currentValue: string) => any

export
interface FlowObject {
  [key: string]: any
}

export
interface Flow {
  get(name: string, fallback: any): void
  getAll(): FlowObject
  setMultiple(setObj: {[key: string]: any}): void
  set(name: string, value: any): void
  update(name: string, updater: UpdaterFunction, defaultValue?: any): void
  teardown(): void
}

export
const getFlow = function(): Flow {
  const flowObjects: FlowObject = {};
  return {
    get(name: string, fallback: any): void {
      const flowObject = flowObjects[name];
      if(flowObjects.hasOwnProperty(name)) return flowObject;
      if(typeof fallback !== 'undefined') return fallback;
      throw new Error(`cannot get flow["${name}"], no fallback provided.`);
    },
    getAll(): FlowObject {
      return flowObjects
    },
    setMultiple(setObj: {[key: string]: any}): void {
      Object.entries(setObj).forEach(([name, value]) => this.set(name, value))
    },
    set(name: string, value: any): void {
      if(flowObjects.hasOwnProperty(name)) throw new Error(`cannot set flow["${name}"], value is already set.`);
      flowObjects[name] = value;
    },
    update(name: string, updater: UpdaterFunction, defaultValue?: any): void {
      const currentValue = typeof flowObjects[name] === "undefined" ? defaultValue : flowObjects[name];
      flowObjects[name] = updater(currentValue);
    },
    teardown() {
      Object.keys(flowObjects).forEach(key => delete flowObjects[key]);
    }
  }
}

