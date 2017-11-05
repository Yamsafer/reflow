# reflow|core

```sh
$ npm install --save reflow-core
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
By dividing the large flows into sub-flows, which increases the modularity of the flows by decreasing the granularity, it becomes easier to understand large flows and makes it possible to reuse the sub-flows to build custom flows, this also helps in getting rid of the duplicate code which can be found in large flows, in the following examples the suites [1,2,3] can be inserted in any flow by just adding the flow "sub-flow".
### Example
## Basic Sub-Flow
```
 subflow('Sub-flow', function() {
  return {
    suites: [
      getSuite('Mocha suite 1'),
      getSuite('Mocha suite 2'),
      getSuite('Mocha suite 3'),
    ],
  };
});
```
#### Forking
This is used to run a flow in two alternative versions, the flow would run in two sequences which are similar with a difference in where the flow was forked, in the given examples the flow would run twice, first it will go through the suites [1,2,3,5] the second time would run [1,2,4,5]
### Example
## Basic Fork
```
  getSubflow('Mocha suite 1'),
  getSubflow('Mocha suite 2'),
  fork([
    getSubflow('Mocha suite 3'),
    getSubflow('Mocha suite 4'),
  ]),
  getSubflow('Mocha suite 5'),
```
#### Conditional
In huge sized flows there could be a sequence that is exclusive to a certain flow which won't be ran if others, so conditionals are used to run these sub-flows, in this example the sub-flows in the flow.js file would run twice in the following sequences [1,2,3,5] and [1,2,4] this is because the suite number 5 is conditional to suite 3, if suit 3 doesn't run then neither will suite 5.
### Example
## Basic Hook
```
// Mocha_suite_5.js
subflow('Mocha suite 5', function() {
  return {
    condition: branches =>
      branches
        .find(branch => branch.name === 'Mocha suite 3'),
    suites: [
      getSuite('Mocha Test 1'),
      getSuite('Mocha Test 2'),
      getSuite('Mocha Test 3'),
    ],
  };
});
// flow.js
getSubflow('Mocha suite 1'),
  getSubflow('Mocha suite 2'),
  fork([
    getSubflow('Mocha suite 3'),
    getSubflow('Mocha suite 4'),
  ]),
  getSubflow('Mocha suite 5'),
```
#### Hooks
These are mainly used to set global variables and help in the transition between the sub-flows, they can also be used to initialize any variable before the whole test starts.
### Example
## Basic Hook
```
hook('variable', function() {
  return {
    before() {
      reflow.set('Variable 1', value);
    },
  };
});
```

