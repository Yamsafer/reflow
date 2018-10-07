import {utils} from 'mocha';
import path from 'path';

const globFiles = (rootPath, {extensions, recursive}) => glob => {
  const globFullpath  = path.join(rootPath, glob)
  try {
    return utils.lookupFiles(globFullpath, extensions, recursive);
  } catch (err) {
    if (err.message.indexOf('cannot resolve path') === 0) {
      console.error('Warning: Could not find any files matching pattern: ' + glob);
      return;
    }
    throw err;
  }
};

export default globFiles;