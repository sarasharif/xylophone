var Store = require ("flux/utils").Store,
    Dispatcher = require('../dispatcher/Dispatcher');

var TrackStore = new Store(Dispatcher);
var _tracks = [];


TrackStore.all = function () {
  return _tracks.slice(0);
};

TrackStore.addTrack = function (track) {
  var idx = _tracks.indexOf(track);
  if (idx == -1) {
    _tracks.push(track);
  }
};

TrackStore.resetTracks = function (tracks) {
  _tracks = tracks.slice();
};

TrackStore.removeTrack = function(track){
  var index = _tracks.indexOf(track);
  _tracks.splice(index, 1);
};

TrackStore.__onDispatch = function (payload) {
  switch(payload.actionType){

  case "ADD_TRACK":
    TrackStore.addTrack(payload.track);
    break;

  case "RESET_TRACK":
    TrackStore.resetTracks(payload.tracks);
    break;

  default:
  }

  this.__emitChange();
};

module.exports = TrackStore;
