module.exports = function (retry) {
  console.log('Setting Up Retry Policy.');
  class ReflowRetryPolicy extends retry.RetryPolicy {
    onReadTimeout() {
      console.log('onReadTimeout')
    }
    rethrowResult() {
      console.log('rethrowResult')
    }
    onRequestError (info, consistency, err) {
      console.log('(info, consistency, err)::', info, consistency, err);
    }
    onUnavailable (info, consistency, required, alive) {
      console.log('onUnavailable')
      if (info.nbRetry > 3) {
        return this.rethrowResult();
      }
      return this.retryResult(undefined, false);
    };
  }

  return new ReflowRetryPolicy();
}
