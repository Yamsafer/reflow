import {mockForkSuites} from '../reflow/mock-fork'

const basicTree = {
  name: "Tree Root: Basic",
  type: "fork",
  before() {
    console.log("Tree Root Basic Before Hook Called.")
  },
  suites: mockForkSuites,
}


const complexTree = {
  name: "Tree Root: Complex",
  type: "fork",
  before() {
    console.log("Tree Root Complex Before Hook Called.")
  },
  suites: [
    {
      type: 'suite',
      name: 'Another Standard Suite',
      path: '/Users/Bamieh/Bamieh/reflow/test/fixture/suite/another-standard-describe',
    },
    {
      type: 'subflow',
      suites: mockForkSuites,
    },
  ]
}


const oneSuiteTree = {
  name: "Tree Root: One Suite",
  type: "fork",
  before() {
    console.log("Tree Root One Suite Before Hook Called.")
  },
  suites: [{
    type: 'suite',
    path: '/Users/Bamieh/Bamieh/reflow/test/fixture/suite/standard-describe',
    name: 'Standard Suite',
  }],
}

const withSuflowTree = {
  name: "Tree Root: withSuflow",
  type: "fork",
  before() {
    console.log("Tree Root With Subflow Before Hook Called.")
  },
  suites: [{
    type: 'subflow',
    suites: mockForkSuites,
  }]
}

export {
  basicTree,
  complexTree,
  oneSuiteTree,
  withSuflowTree,
}