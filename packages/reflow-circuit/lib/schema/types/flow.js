const {
  graphql,
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLID,
  GraphQLList,
} = require('graphql');


module.exports = new GraphQLObjectType({
  name: 'Flow',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve(parent, args, { loaders }, r) {
        return parent._id;
      },
    },
    title: {
      type: new GraphQLNonNull(GraphQLString),
      resolve(parent) {
        return parent._source.title;
      }
    },
    numberOfCases: { type: new GraphQLNonNull(GraphQLInt) },
    startTime: {
      type: new GraphQLNonNull(GraphQLString),
      resolve(parent) {
        return parent._source.startTime;
      }
    },
    endTime: { type: GraphQLString },
  }
});
