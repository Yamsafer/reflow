/// <reference path="typings/globals.d.ts" />
import {
  Flow,
  getFlow,
} from '../src/commands/flow-variables'

describe('Flow Variables', function() {
  let flowVariables: Flow;
  before(function() {
    flowVariables = getFlow();
  })
  describe("get all function", function() {
    it("returns empty object when nothing is set", function() {
      const flowObjects = flowVariables.getAll()
      expect(flowObjects).to.be.empty
    })
    it("returns all set objects", function() {
      flowVariables.set("key", 1);
      const flowObjects = flowVariables.getAll()
      expect(flowObjects).to.deep.equal({key: 1});
    })
  })
  describe("teardown", function() {
    it("empties flow variables", function() {
      flowVariables.set("key", 1);
      const flowObjects = flowVariables.getAll()
      flowVariables.teardown();
      expect(flowObjects).to.be.empty
    })
  })
  describe("set functions", function() {
    it("sets a single key value", function() {
      flowVariables.set("key", 1);
      const flowObjects = flowVariables.getAll()
      expect(flowObjects).to.deep.equal({key: 1});
    })
    it("throws if variable is already set", function() {
      const setterFn = () => flowVariables.set("key", 3);
      setterFn();
      expect(setterFn).to.throw();
    })
    it("sets multiple key value", function() {
      const multiple = {
        key: 1,
        key2: 2,
      }
      flowVariables.setMultiple(multiple);
      const flowObjects = flowVariables.getAll()
      expect(flowObjects).to.deep.equal(multiple);
    })
  })
  describe("update function", function() {
    it("updater function sets value", function() {
      flowVariables.update("key", _ => 3);
      const flowObjects = flowVariables.getAll()
      expect(flowObjects).to.deep.equal({key: 3});
    });

    it("passes current value to updater", function() {
      const currentValue = 1;
      flowVariables.set("key", currentValue);
      const updater = sinon.spy((currentValue: any) => {
        expect(currentValue).to.equal(currentValue)
      })
      flowVariables.update("key", updater);
      expect(updater).to.be.calledOnce
    })

    it("passes default value to updater if variable is undefined", function() {
      const defaultValue = 3;
      const updater = sinon.spy((currentValue: any) => {
        expect(currentValue).to.equal(defaultValue)
      })
      flowVariables.update("key", updater, defaultValue);
      expect(updater).to.be.calledOnce
    })
  })
  afterEach(function() {
    flowVariables.teardown();
  })
})
