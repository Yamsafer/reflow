const globalID = require('../../util/global-id');

module.exports = client => ({
  get() {
    return [{
      node: {
        id: globalID.encode('project', '6366977657833263104'),
        title: 'Yamsafer-Backend',
      }
    }, {
      node: {
        id: globalID.encode('project', '6467322451205296128'),
        title: 'Yamsafer-Frontend',
      }
    }, {
      node: {
        id: globalID.encode('project', '6467322376873840640'),
        title: 'Yamsafer-iOS',
      }
    }]
  }
})
