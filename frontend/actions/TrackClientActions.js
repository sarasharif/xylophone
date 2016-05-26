var TrackApiUtil = require('../util/TrackApiUtil');

var TrackClientActions = {

  createTrack: function (trackData) {
    trackData.roll = JSON.stringify(trackData.roll);
    TrackApiUtil.createTrack(trackData);
  },

  deleteTrack: function (id) {
    TrackApiUtil.deleteTrack(id);
  },

  fetchAllTracks: function () {
    TrackApiUtil.fetchAllTracks();
  },

  fetchSingleTrack: function (id) {
    TrackApiUtil.fetchSingleTrack(id);
  }

};

module.exports = TrackClientActions;
