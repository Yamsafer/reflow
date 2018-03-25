class NativeActions {
  constructor() {
    console.log('Binding Native Actions.');
  }
}

NativeActions.prototype = {
  alerts: require('./alerts'),
  execute: require('./execute'),
  session: require('./session'),
  fetch: require('./fetch'),
  source: require('./source'),
}

module.exports = NativeActions;
