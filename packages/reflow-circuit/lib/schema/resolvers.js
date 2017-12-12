const resolverMap = {
  Query: {
    suite(parent, args, context, info) {
      return {
        title: "hi mom"
      }
    },
    combination(parent, args, {loaders}, info) {
      return loaders.combinationsByIds.load(args.id);
    },
    jobs(parent, args, {elastic}, info) {
      return elastic.getJobs(args);
    },
    flows(parent, args, {elastic}, info) {
      return elastic.getFlows(args.jobID);
    },
  },
  Mutation: {
    insertCombination(parent, {input}, {elastic}, info) {
      return elastic.newCombination(input);
    }
  }
};

module.exports = resolverMap;
