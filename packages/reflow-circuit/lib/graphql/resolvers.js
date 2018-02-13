const globalID = require('../util/global-id');
const resolverMap = {
  Mutation: {
    insertCombination(parent, {input}, {connection}) {
      return connection.combination.insert(input);
    },
  },
  Node: {
    __resolveType(obj, context, info) {
      console.log('Node __resolveType::', obj.type)
      switch(obj.type) {
        case 'Flow':
          return obj.type;
        default:
          return 'Flow'; //set to null
      }
    },
  },
  Query: {
    node(obj, args, { connection }) {
      return connection.node(args.id);
    },
    viewer(obj, args, context) {
      return {
        id: 1,
      }
    },
  },
  FlakeID: {
    serialize(value) {
      console.log('FlakeID serialize(value)', value)
      return value;
    },
    parseValue(value) {
      console.log('FlakeID parseValue(value)', value)
      return value;
    },
    parseLiteral(ast) {
      console.log('FlakeID parseLiteral(ast)', ast)
      return ast.value
    }
  },
  PageInfo: {
    hasNextPage(connection, args) {
      console.log('connection::', connection)
      console.log('args::', args)
      return true
    },
    hasPreviousPage(connection, args) {
      return true
    },
  },

  ProjectConnection: {
    edges(obj, args, { connection }) {
      return connection.project.get();
    },
  },
  JobConnection: {
    edges(obj, args, { connection }) {
      const {projectID, ...cursorInfo} = obj;
      return connection.job.getByProjectID(projectID, cursorInfo);
    }
  },
  FlowConnection: {
    edges(obj, args, { connection }) {
      const {jobID, ...cursorInfo} = obj;
      return connection.flow.getByJobID(jobID, cursorInfo);
    }
  },
  CombinationConnection: {
    edges(obj, args, { connection }) {
      const {flowID, ...cursorInfo} = obj;
      return connection.combination.getByFlowID(flowID, cursorInfo);
    }
  },
  SuiteConnection: {
    edges(obj, args, { connection }) {
      const {combinationID, ...cursorInfo} = obj;
      return connection.suite.getByCombinationID(combinationID, cursorInfo);
    }
  },
  User: {
    projects(user, args) {
      return {
        pageInfo: {},
        edges: []
      };
    },
    jobs(user, args) {
      return args
    },
    flows(user, args) {
      return args;
    },
    combinations(user, args) {
      return args
    },
    suites(user, args) {
      return args
    },
  },
};

module.exports = resolverMap;
