import * as glob from 'glob'
import * as getLogger from 'wdio-logger';
const logger = getLogger('reflow');

const resolveModule = (modulePath: string) => {
  try {
    return require(modulePath);
  } catch(err) {
    logger.error(`Error resolving module ${modulePath}`, err);
    return;
  }
}

export
const requireGlob = (pageObjectGlob: string) => {
  return glob
    .sync(pageObjectGlob)
    .map(resolveModule)
    .filter(Boolean)
}
