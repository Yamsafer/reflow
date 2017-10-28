const express = require('express')
const app = express()

const initialize = () => {
  var pathLogger = function(req, res, next) {
    console.log(`Request '${req.path}' logged via middleware`)
    next()
  }

  app.use(pathLogger)

  app.get('/', function(req, res) {
    res.send('Hello World!')
  })

  app.listen(3000, function() {
    console.log('Reflow listening on port 3000')
  })
}

module.exports = initialize