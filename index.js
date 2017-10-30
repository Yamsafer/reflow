'use strict';

const targetFolder = process.env.REFLOW_ENV === "DEV"? "lib" : "distribution";

module.exports = require(`./${targetFolder}/reflow`);