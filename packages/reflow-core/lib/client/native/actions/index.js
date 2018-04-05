// const actions = ['alerts','execute','session','fetch','source'];
// class NativeActions {
//   constructor() {
//     console.log('Binding Native Actions.');
//     actions.forEach(action => this[action] = require(`./${action}`));
//   }
// }

// module.exports = NativeActions;


class NativeActions {
  constructor() {
    console.log('Binding Native Actions.');
  }
}

const actions = ['alerts','execute','session','fetch','source'];
actions.forEach(action => NativeActions.prototype[action] = require(`./${action}`));

module.exports = NativeActions;
