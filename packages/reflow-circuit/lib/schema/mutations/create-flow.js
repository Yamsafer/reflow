const {
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLID,
  GraphQLInputObjectType,
} = require('graphql');

const FlowType = require('../types/flow');
const JobInput = new GraphQLInputObjectType({
  name: 'JobInput',
  fields: {
    id: { type: new GraphQLNonNull(GraphQLID) },
    numberOfFlows: { type: new GraphQLNonNull(GraphQLInt) },
    numberOfThreads: { type: new GraphQLNonNull(GraphQLInt) },
    creationDate: { type: new GraphQLNonNull(GraphQLString) },
  }
});
const FlowInput = new GraphQLInputObjectType({
  name: 'FlowInput',
  fields: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    startTime: { type: new GraphQLNonNull(GraphQLString) },
    endTime: { type: GraphQLString },
    jobDetails: { type: new GraphQLNonNull(JobInput) },
  }
});

module.exports = {
  type: FlowType,
  description: "Create a New E2E Flow",
  args: {
    flow: { type: new GraphQLNonNull(FlowInput) }
  },
  resolve(parent, args, { elastic }) {
    return elastic.createFlow(args.flow).then(result => {
      console.log("result!", result);
      return result;
    });
  }
}
