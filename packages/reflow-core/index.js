'use strict';
require('babel-register')()

// const targetFolder = process.env.REFLOW_ENV === "DEV"? "lib" : "distribution";
const targetFolder = "lib";
module.exports = require(`./${targetFolder}/reflow`);
