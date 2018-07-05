// const glob = require('glob');
// const getSections = (filepath) => {
//   return [];
// }


// const getSection = filepath => ({filepath, section: require(filepath)});

// const path = require('path');
// const toCamelCase = str => str.toLowerCase().trim().split(/[.\-_\s]/g).reduce((str, word) => str + word[0].toUpperCase() + word.slice(1));
// const createPageObject = ({filepath, section}) => {
//   const id = section.id || section.name || toCamelCase(path.basename(filepath, ".section.js"));
//   return Object.assign({}, section, { id });
// }

// const EventEmitter = require('events');

// class PageObjects extends EventEmitter {
//   constructor() {
//     this.pageObjects = new Map();
//   }
//   add(filepath) {
//     getSections(filepath)
//       .map(getSection)
//       .map(createPageObject)
//       .forEach(pageObject => this.pageObjects.set(pageObject.id, pageObject));
//   }
// }

// module.exports = PageObjects;
