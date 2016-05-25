var $ = require("jquery"),
    KeyActions = require('../actions/KeyActions');
    // TrackActions = require('../actions/TrackActions');



function Track (attrs) {
  var attributeDefaults = {
    name: "",
    roll: []
  };
}

Track.prototype = {

  startRecording: function(){
    this.attributeDefaults.roll = [];
    this.startTime = Date.now();
  },

  _timeDelta: function(){
    return Date.now() - this.startTime;
  },

  addNotes: function(notes){
    var timeSlice = { time: this._timeDelta() };
    if (notes.length > 0){
      timeSlice.notes = notes;
    }

    this.attributeDefaults.roll.push(timeSlice);
  },

  stopRecording: function(){
    this.addNotes([]);
  }

};

module.exports = Track;
