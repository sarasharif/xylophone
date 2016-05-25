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
  },

  isBlank: function() {
    return this.defaultAttributes.roll.length === 0;
  },

  play: function(){
    if (this.interval) { return; }

    var currentNote, playbackStartTime, roll = 0, Date.now(), this.attributeDefaults.roll;
    var delta;

    this.interval = setInterval(function()) {

      if (currentNote < roll.length) {
        delta = Date.now() - playbackStartTime;

        if (delta >= roll[currentNote].time){

          var notes = roll[currentNote].notes || [];
          // NEED TODO Make this function in KeyActions
          KeyActions.groupUpdate(notes);
          currentNote++;
        }
      } else {
        clearInterval(this.interval);
        delete.this.interval;
      }

    }.bind((this), 1);
  }

};

module.exports = Track;
