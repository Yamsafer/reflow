const globalID = require('../util/global-id');
const resolverMap = {
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
    edges(args) {
      console.log('JobConnection edges args:::', args)
      return [{
        node: {
          numberOfThreads: 1333,
          flows: args => args,
        }
      }]
    }
  },
  FlowConnection: {
    edges(obj) {
      return [{
        node: {
          title: 'mobile shit',
          combinations: args => args,
        }
      }]
    }
  },
  CombinationConnection: {
    edges(obj, args, context) {
      return [{
        node: {
          passes: 111
        }
      }]
    }
  },
  User: {
    flows(user, args) {
      return args;
    },
    jobs(user, args, { elastic }) {
      const {projectID, ...cursorInfo} = args;
      return elastic.getJobs(projectID, cursorInfo);
      {
        pageInfo: {
          jobS: 1
        },
        edges: []
      };
    },
    projects(user, args) {
      return {
        pageInfo: {},
        edges: []
      };
    }
  },
};

module.exports = resolverMap;
