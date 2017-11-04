# Re|flow


## Getting Started
Install `re-flow` in your project to get started!

```sh
$ npm install --save re-flow
```

### Current Features:
Create Mocha flows for true Integration Testing.
- Test Flows
- Subflows
- Forking Subflows
- Conditional subflows
- Analyze mode
- Multi-Threaded runtime
- Tags

### Example
#### Basic Flow
```
reflow("Example Flow", function() {
  return [
    getSuite('Mocha suite 1'),
    getSuite('Mocha suite 2'),
  ]
})
```
#### Subflows
#### Forking
#### Conditional
#### Hooks


