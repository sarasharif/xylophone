var Dispatcher = require("../dispatcher/Dispatcher");
// constants

var TrackServerActions = {
  receiveSingleTrack: function (track) {
    Dispatcher.dispatch({
      actionType: "ADD_TRACK",
      track: track
    });
  },

  removeTrack: function (track) {
    Dispatcher.dispatch({
      actionType: "REMOVE_TRACK",
      track: track
    });
  },

  receiveAllTracks: function (tracks) {
    Dispatcher.dispatch({
      actionType: "TRACKS_RECEIVED",
      tracks: tracks
    });
  }

};

module.exports = TrackServerActions;
