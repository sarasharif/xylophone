var TrackServerActions = require("../actions/TrackServerActions");

var TrackApiUtil = {

  createTrack: function (trackData) {
    $.ajax({
      url: '/api/tracks',
      method: 'POST',
      data: {name: trackData.name, roll: JSON.stringify(trackData.roll) },
      dataType: 'json',
      contentType: "application/json",
      success: function (track) {
        TrackServerActions.receiveSingleTrack(track);
      }
    });
  },

  destroyTrack: function (id) {
    $.ajax({
      url: "api/tracks/" + id,
      type: "DELETE",
      success: function (track) {
        TrackServerActions.removeTrack(track);
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
  }
};

module.exports = TrackApiUtil;
