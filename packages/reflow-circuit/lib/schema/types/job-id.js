const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLInputObjectType,
  GraphQLID,
} = require('graphql');

const JobID = new GraphQLObjectType({
  name: 'JobID',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  }
})

const JobIDInputType = new GraphQLInputObjectType({
  name: 'JobID',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
  }
})

module.exports.input = JobIDInputType
