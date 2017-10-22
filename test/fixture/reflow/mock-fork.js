const mockForkHooks = {
  before() {
    console.log('Mock Fork before hook called.')
  }
}

const mockForkSuites = [
  {
    type: 'suite',
    name: 'Standard Suite',
    path: '/Users/Bamieh/Bamieh/reflow/test/fixture/suite/standard-describe',
  },
  {
    type: 'suite',
    name: 'Hooked Suite',
    path: '/Users/Bamieh/Bamieh/reflow/test/fixture/suite/hooked-describe',
  },
];

const mockFork = {
  name: 'Mock Fork',
  ...mockForkHooks,
  suites: mockForkSuites,
}

export default mockFork

export {
  mockForkHooks,
  mockForkSuites,
}
