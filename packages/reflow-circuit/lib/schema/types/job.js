const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLID,
} = require('graphql');

const JobDetails = new GraphQLObjectType({
  name: 'JobDetails',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLInt) },
    numberOfFlows: { type: new GraphQLNonNull(GraphQLInt) },
    numberOfThreads: { type: new GraphQLNonNull(GraphQLInt) },
    creationDate: { type: new GraphQLNonNull(GraphQLString) },
  }
})

module.exports = JobDetails
