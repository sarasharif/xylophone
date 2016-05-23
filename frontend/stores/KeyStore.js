var Dispatcher = require('../dispatcher/Dispatcher.js');
var Store = require("flux/utils").Store;
var Note = require("../util/Note");

var KeyStore = new Store (Dispatcher);

var _currentKeys = [];

KeyStore.addKey = function(note){
  if (!this.playing(note)){
    _currentKeys.push(note);
    KeyStore.__emitChange();
  }
};

KeyStore.removeKey = function(note){
  var index = _currentKeys.indexOf(note);
  _currentKeys.splice(index, 1);
  KeyStore.__emitChange();
};

KeyStore.currentKeys = function(){
  return _currentKeys.slice();
};

KeyStore.playing = function(currentKey){
  return _currentKeys.includes(currentKey);
};

KeyStore.__onDispatch = function(payload){
  switch(payload.actionType){
    case 'ADDKEY':

    KeyStore.addKey(payload.note);
    break;
    case 'REMOVEKEY':
    KeyStore.removeKey(payload.note);
    break;
  }
};


module.exports = KeyStore;
