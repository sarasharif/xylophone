var TrackApiUtil = require('../util/TrackApiUtil');

var TrackClientActions = {

  createTrack: function (trackData) {
    TrackApiUtil.createTrack(trackData);
  },

  deleteTrack: function (id) {
    TrackApiUtil.destroyTrack(id);
  },

  fetchAllTracks: function () {
    TrackApiUtil.fetchAllTracks();
  }
};

module.exports = TrackClientActions;
