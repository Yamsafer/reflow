const resolverMap = {
  Query: {
    combination(parent, args, {loaders}, info) {
      return loaders.combinationsByIds.load(args.id);
    },
    jobs(parent, args, {elastic}, info) {
      return elastic.getJobs(args);
    },
    flows(parent, args, {elastic}, info) {
      return elastic.getFlows(args.jobID);
    },
    flow(parent, args, {elastic}, info) {
      return elastic.getFlow(args.id);
    },
  },
  Mutation: {
    insertCombination(parent, {input}, {elastic}, info) {
      return elastic.newCombination(input);
    }
  }
};

module.exports = resolverMap;
