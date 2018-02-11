export const isNonEmpty = array => {
  return Array.isArray(array) && array.length > 0
}

export const getRelayData = (viewer, connectionName) => {
  try {
    return viewer[connectionName].edges
  } catch(e) {
    return []
  }
}
