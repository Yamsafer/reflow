class NativeActions {
  constructor() {
    console.log('Binding Native Actions.');
  }
}

const actions = ['alerts','execute','session','fetch','source'];
actions.forEach(action => NativeActions.prototype[action] = require(`./${action}`));

module.exports = NativeActions;
