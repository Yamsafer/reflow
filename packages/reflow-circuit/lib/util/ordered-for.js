const _ = require('lodash');

const orderedFor = (data, collection, field, singleObject) => {
  const inGroupsOfField = _.groupBy(data, field);
  return collection.map(element => {
    const elementArray = inGroupsOfField[element];
    if (elementArray) {
      return singleObject ? elementArray[0] : elementArray;
    }
    return singleObject ? {} : [];
  });
};

module.exports = orderedFor;
