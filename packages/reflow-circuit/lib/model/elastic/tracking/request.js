module.exports = client => ({
  insertRequestEvent(body) {
    return client.index({
      index: 'reflow-tracks',
      type: 'request',
      body,
    }).then(result => ({
      id: result._id,
      ...body,
    }))
  },
})
