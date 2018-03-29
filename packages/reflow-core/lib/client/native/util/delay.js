/**
 * Creates a delay at the specified number of ms.
 *
 * @param delay
 * @returns {Promise}
 */

module.exports = function delay(delay) {
  return new Promise(resolve => setTimeout(resolve, delay));
}
