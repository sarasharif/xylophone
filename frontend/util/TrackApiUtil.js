var $ = require("jquery"),
    Track = require("./Track"),
    AppDispatcher = require('../dispatcher/Dispatcher'),
    TrackActions = require("../actions/TrackActions");

var TrackApiUtil = {
  createTrack: function (track) {
    $.ajax({
      url: '/api/tracks',
      method: 'POST',
      data: JSON.stringify({ track: track }),
      dataType: 'json',
      contentType: "application/json",

      // See http://stackoverflow.com/questions/7203304/warning-cant-verify-csrf-token-authenticity-rails
      beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},

      success: function (track) {
        TrackActions.addTrack(new Track(track));
      }
    });
  },

  fetchTracks: function () {
    $.getJSON('/api/tracks', function (trackObjects) {
      var tracks = trackObjects.map(function (trackData) {
        return new Track(trackData);
      });

      TrackActions.resetTracks(tracks);
    });
  }
};

AppDispatcher.register(function(payload) {
  switch(payload.actionType){
  case OrganConstants.CREATE_TRACK:
    TrackApiUtil.createTrack(payload.track);
    break;
  default:
  }
})


module.exports = TrackApiUtil;
