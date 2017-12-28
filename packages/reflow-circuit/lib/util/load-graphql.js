const fs = require('fs');
const path = require('path');

module.exports = (relativePath) => {
  const __parentDirname = path.dirname(module.parent.filename);
  const fullPath = path.join(__parentDirname, relativePath);
  return fs.readFileSync(fullPath, "utf8");
}

