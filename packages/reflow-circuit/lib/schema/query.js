const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = require('graphql');

const FlowType = require('./types/flow');
const JobType = require('./types/job');
// const JobIDType = require('./types/job-id');

const RootQueryType = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    jobs: {
      type: new GraphQLList(JobType),
      description: "A list of Jobs",
      args: {
        first: {type: new GraphQLNonNull(GraphQLInt) },
        // after: { type: GraphQLString },
      },
      resolve(parent, args, { elastic }) {
        return elastic.getJobs(args);
      }
    },
    jobDetails: {
      type: new GraphQLList(FlowType),
      description: "Job Details",
      args: {
        id: { type: GraphQLString },
      },
      resolve(parent, args, { loaders }) {
        return loaders.flowsByJobsIds.load(args.id);
      },
    },
    flowDetails: {
      type: FlowType,
      description: 'A Test Flow',
      args: {
        id: { type: GraphQLString },
      },
      resolve(parent, args, { loaders }) {
        return loaders.flowsByIds.load(args.id);
      },
    },
    flows: {
      type: new GraphQLList(FlowType),
      description: "A list of Flows",
      args: {
        first: {type: new GraphQLNonNull(GraphQLInt) },
        after: { type: GraphQLString },
      },
      resolve(parent, args, { elastic }) {
        return elastic.getFlows(args);
      }
    },
  }
});

module.exports = RootQueryType;
