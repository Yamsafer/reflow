const globalID = require('../../util/global-id');

module.exports = client => ({
  get() {
    return [{
      node: {
        id: globalID.encode('project', '6366977657833263104'),
        title: 'Yamsafer-Backend',
      }
    }]
  }
})
