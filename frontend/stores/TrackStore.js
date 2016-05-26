var Store = require ("flux/utils").Store,
    Dispatcher = require('../dispatcher/Dispatcher');

var TrackStore = new Store(Dispatcher);
var _tracks = [];


TrackStore.all = function () {
  debugger;
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


TrackStore.__onDispatch = function(payload) {
  switch(payload.actionType){

  case "ADD_TRACK":
    TrackStore.addTrack(payload.track);
    break;

  case "REMOVE_TRACK":
    TrackStore.removeTrack(payload.track);
    break;

  case "RESET_TRACK":
    TrackStore.resetTracks(payload.tracks);
    break;

  case "TRACKS_RECEIVED":
    TrackStore.resetTracks(payload.tracks);
    break;

  }
  this.__emitChange();
};

module.exports = TrackStore;
