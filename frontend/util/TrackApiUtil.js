var TrackServerActions = require("../actions/TrackServerActions");

var TrackApiUtil = {

  createTrack: function (trackData) {
    $.ajax({
      url: '/api/tracks',
      method: 'POST',
      data: {track: trackData},
      // dataType: 'json',
      // contentType: "application/json",
      success: function (track) {
        TrackServerActions.receiveSingleTrack(track);
      }
    });
  },

  deleteTrack: function (id) {

    $.ajax({
      url: "api/tracks/" + id,
      type: "DELETE",
      success: function (track) {
        TrackServerActions.removeTrack(track);
      },
      error: function(data){
        debugger
      }
    });
  },

  fetchAllTracks: function () {
    $.ajax({
      url: "api/tracks",
      type: "GET",
      success: function (tracks) {
        TrackServerActions.receiveAllTracks(tracks);
      }
    });
  },

  fetchSingleTrack: function(id){
    $.ajax({
      url: "api/tracks/" + id,
      type: "GET",
      success: function (track) {
        TrackServerActions.receiveSingleTrack(track);
      }
    });
  }
};

module.exports = TrackApiUtil;
