const tags = (tags) => {
  if(!Array.isArray(tags) || !tags.length) return null;
  return tags;
}
const status = (curCombs, totalCombs) => {
  if(curCombs === 0 && totalCombs > 0) return 'PENDING';
  if(curCombs < totalCombs) return 'INPROGRESS';
  return 'COMPLETE'
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
  tags,
  status,
  result,
  endTime,
}
