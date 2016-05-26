var Dispatcher = require("../dispatcher/Dispatcher");
// constants

var TrackServerActions = {
  receiveSingleTrack: function (track) {
    Dispatcher.dispatch({
      actionType: "TRACK_RECEIVED",
      track: track
    });
  },

  removeTrack: function (track) {
    Dispatcher.dispatch({
      actionType: "TRACK_REMOVED",
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
