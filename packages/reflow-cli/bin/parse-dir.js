const visitedFiles = [];
const addHandler = function(file) {
  console.log('Adding handler to: ', file);
}

const parseDir = function parseDir(dir, callerFilename, opts) {
  opts = opts || {}
  // disable recursion to support nested directories of subcommands
  if (typeof opts.recurse !== 'boolean') opts.recurse = true
  // exclude 'json', 'coffee' from require-directory defaults
  if (!Array.isArray(opts.extensions)) opts.extensions = ['js']
  // allow consumer to define their own visitor function
  const parentVisit = typeof opts.visit === 'function' ? opts.visit : o => o
  // call addHandler via visitor function
  opts.visit = function visit (obj, joined, filename) {
    const visited = parentVisit(obj, joined, filename)
    // allow consumer to skip modules with their own visitor
    if (visited) {
      // check for cyclic reference
      // each command file path should only be seen once per execution
      if (~visitedFiles.indexOf(joined)) return visited
      // keep track of visited files in visitedFiles
      visitedFiles.push(joined)
      addHandler(visited)
    }
    return visited
  }


  return require('require-directory')({require, filename: callerFilename}, dir, opts)
}

module.exports = parseDir
