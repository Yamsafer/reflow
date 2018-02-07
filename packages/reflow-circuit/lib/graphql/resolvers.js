const globalID = require('../util/global-id');
const resolverMap = {
  Mutation: {
    insertCombination(parent, {input}, {connection}) {
      return connection.combination.insert(input);
    },
  },
  Query: {
    viewer() {
      return {
        id: globalID('user', 1),
      }
    },
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
    edges(obj, args) {
      const projectID = globalID('project', 1);
      return [{
        cursor: projectID,
        node: {
          id: projectID,
          title: 'Yamsafer-Backend',
          jobs: args => ({
            pageInfo: {A: 2},
            edges: {projectID, ...args},
          }),
        }
      }];
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
