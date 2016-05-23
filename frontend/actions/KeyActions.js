var Dispatcher = require("../dispatcher/Dispatcher");


var KeyActions = {
  removeKey: function(note) {
  //all content inside curly brackets is the PAYLOAD
    Dispatcher.dispatch({
      actionType: 'REMOVEKEY',
      note: note
    });
  },

  addKey: function(note) {
  
    Dispatcher.dispatch({
      actionType: 'ADDKEY',
      note: note
    });
  }
};



// KeyStore.removeKey(Tones.TONES[event.currentTarget.value]);
//
//
// KeyStore.addKey(Tones.TONES[event.currentTarget.value]);

module.exports = KeyActions;
