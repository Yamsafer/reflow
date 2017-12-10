const resolverMap = {
  Query: {
    suite(obj, args, context, info) {
      return {
        title: "hi mom"
      }
    },
  },
};

module.exports = resolverMap;
