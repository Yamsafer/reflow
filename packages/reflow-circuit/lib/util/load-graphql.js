const fs = require('fs');
const glob = require('glob');
const __parentDirname = require('path').dirname(module.parent.filename);
const readFileSync = file => fs.readFileSync(file, "utf8");

module.exports = (path) => {
  console.log('Loading graphql schema files...');

  const graphqlFilesGlob = `${path}/**/*.graphql`;
  const files = glob.sync(graphqlFilesGlob, {
    absolute: true,
    cwd: __parentDirname,
  });

  return files.map(readFileSync)
}
