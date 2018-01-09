const resolverMap = {
  Query: {
    combination(parent, args, {loaders}) {
      return loaders.combinationsByIds.load(args.id);
    },
    jobs(parent, args, {elastic}) {
      return elastic.getJobs(args);
    },
    flows(parent, args, {elastic}) {
      return elastic.getFlows(args.jobID);
    },
    flow(parent, args, {elastic}) {
      return elastic.getFlow(args.id);
    }
  },
  Mutation: {
    insertCombination(parent, {input}, {elastic}) {
      return elastic.newCombination(input);
    },
    trackRequest(parent, {input}, {elastic}) {
      return elastic.insertRequestEvent(input)
    },
  }
};

module.exports = resolverMap;
