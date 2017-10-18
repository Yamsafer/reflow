const mockForkHooks = {
  before() {
    console.log('Mock Fork before hook called.')
  }
}

const mockForkSuites = [
  {
    type: 'suite',
    name: 'Standard Suite',
  },
  {
    type: 'suite',
    name: 'Hooked Suite',
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
