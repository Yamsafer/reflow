const { types } = require('cassandra-driver');
const toDate = (iso) => {
  return new types.LocalDate.fromDate(new Date(iso))
}
const toBigInt = (bigInt) => {
  return types.Long.fromString(bigInt);
}
const tags = (tags) => {
  if(!Array.isArray(tags) || !tags.length) return null;
  return tags;
}
const status = (curCombs, totalCombs) => {
  if(curCombs === 0 && totalCombs > 0) return 'PENDING';
  if(curCombs < totalCombs) return 'INPROGRESS';
  return 'COMPLETE'
}
const transformUndefined = (params) => {
  return params.map(param => typeof param === 'undefined'? null : param);
}
const result = (curCombs, totalCombs, failures) => {
  if(curCombs < totalCombs) return 'PENDING';
  return failures? 'FAILURE' : 'SUCCESS';
}
const endTime = (curCombs, totalCombs, lastReported) => {
  if(curCombs < totalCombs) null;
  return lastReported;
}

module.exports = {
  toBigInt,
  toDate,
  undefined: transformUndefined,
  tags,
  status,
  result,
  endTime,
}
