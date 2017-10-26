# Welcome!
Re-flow Allows you to create super powerful *flows* for mocha.

> The library is still in development.

## Getting Started
```sh
$ npm install --save re-flow
```

## Example
### Basic Flow
```
reflow("Example Flow", function() {
  return {
    before() {
       this.toAll = "hi";
    }
    suites: {
      reflow.getSuite('Mocha suite 1'),
      reflow.getSuite('Mocha suite 2'),
    }
  }
})
```
### Subflows
### Forking
### Conditional


## Current Features:
Create Mocha flows for true E2E Testing.
- Test Flows
- Subflows
- Forking Subflows
- Conditional subflows
- Analyze mode
- Multi-Threaded runtime
- Tags


## Future:
- Selenium and Appium
Create an http server for reflow, this will enable multiple things:
- A UI for the tests
- A place to see the documentation for the APIs
- A place to see the flow tree
- A place to see reporting of tests
- A place to trigger testing
- A place to see anomalies


## 2.0.0 ToDo:
- evaluate subflow later on [done]
- get subflow path [done]
- get flow path [done]
= expose mocha-reflow as the main file
= fix thread pool mem leak or switch to another alternative
  - check npool: https://www.npmjs.com/package/npool
  - create own thread pool

