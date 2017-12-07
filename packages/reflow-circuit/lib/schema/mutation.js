const { GraphQLObjectType } = require('graphql');

const CreateFlowMutation = require('./mutations/create-flow')

const RootMutationType = new GraphQLObjectType({
  name: 'RootMutation',
  fields: () => ({
    CreateFlow: CreateFlowMutation,
  })
});

module.exports = RootMutationType
