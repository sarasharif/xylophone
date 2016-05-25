var TrackApiUtil = require('../util/TrackApiUtil');

var TrackClientActions = {

  createTrack: function () {
    TrackApiUtil.createTrack(trackData);
  },

  deleteTrack: function () {
    TrackApiUtil.destroyTrack(id);
  },

  getAllTracks: function () {
    TrackApiUtil.fetchAllTracks();
  }
};

module.exports = TrackClientActions;
