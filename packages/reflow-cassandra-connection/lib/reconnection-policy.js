module.exports = function(reconnection) {
  console.log('Setting Up Reconnection Policy.');

  class ReflowReconnectionPolicy extends reconnection.ConstantReconnectionPolicy {
    constructor(delay=1000) {
      super(delay);
      this.numberOfRetries = 0;
      this.delay = delay;
    }
    newSchedule() {
      console.log('retrying...')
      return {
        next: function () {
          this.numberOfRetries++;
          return { value: this.delay, done: false};
        }
      }
    }
  }

  return new ReflowReconnectionPolicy(3000);
}
