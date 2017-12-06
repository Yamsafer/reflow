const { GraphQLEnumType } = require('graphql');

const Status = new GraphQLEnumType({
  name: 'Status',
  values: {
    SUCCESS: { value: 0 },
    FAILURE: { value: 1 },
    INTERRUPTED: { value: 2 },
    INITIATED: { value: 3 },
    WORKING: { value: 4 },
  }
});

module.exports = Status
