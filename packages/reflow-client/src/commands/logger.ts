import * as getLogger from 'wdio-logger';

export const logger = getLogger('reflow')

export const trace = logger.trace
export const debug = logger.debug
export const info = logger.info
export const warn = logger.warn
export const error = logger.error
