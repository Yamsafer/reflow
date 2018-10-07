/**
 * Creates a promise that resolves at the specified number of ms.
 *
 * @param ms
 * @returns {Promise}
 */
const PROMISE_TIMEOUT = {};
import transmission from 'winston-transmission'

export function resolveBefore(promise, ms, msg) {
  return Promise.race([
    promise,
    new Promise(resolve => setTimeout(() => resolve(PROMISE_TIMEOUT), ms)),
  ]).then((res) => {
    if (res === PROMISE_TIMEOUT) transmission.info(msg, { timeout: ms });
    return res;
  });
}
