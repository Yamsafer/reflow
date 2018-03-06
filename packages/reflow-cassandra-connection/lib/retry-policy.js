module.exports = function (retry) {
  console.log('Setting Up Retry Policy.');
  class ReflowRetryPolicy extends retry.RetryPolicy {
    constructor() {
      super()
      console.log('const')
    }
    onReadTimeout() {
      console.log('ok..')
    }
    rethrowResult() {
      console.log('hi')
    }
    onRequestError (info, consistency, err) {
      console.log('(info, consistency, err)::', info, consistency, err);
    }
    onUnavailable (info, consistency, required, alive) {
      console.log('hi;')
      if (info.nbRetry > 3) {
        return this.rethrowResult();
      }
      return this.retryResult(undefined, false);
    };
  }

  return new ReflowRetryPolicy();
}
