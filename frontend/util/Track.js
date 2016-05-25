var $ = require("jquery"),
    KeyActions = require('../actions/KeyActions');
    // TrackClientActions = require('../actions/TrackClientActions');



function Track (attrs) {
  var defaults = {
    name: "",
    roll: []
  };

  this.attributeDefaults = $.extend(defaults, attrs || {});
}

Track.prototype = {

  startRecording: function(){
    this.attributeDefaults.roll = [];
    this.startTime = Date.now();
  },

  stopRecording: function(){
    this.addNotes([]);
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

  isBlank: function() {
    return this.attributeDefaults.roll.length === 0;
  },

  play: function(){
    if (this.interval) { return; }

    var currentNote = 0
    var playbackStartTime = Date.now();
    var roll = this.attributeDefaults.roll;
    var delta;

    this.interval = setInterval(function() {

      if (currentNote < roll.length) {
        delta = Date.now() - playbackStartTime;

        if (delta >= roll[currentNote].time){

          var notes = roll[currentNote].notes || [];
          KeyActions.groupUpdate(notes);
          currentNote++;
        }
      } else {
        clearInterval(this.interval);
        delete this.interval;
      }

    }.bind(this), 1);
  },

  save: function(){
    if (this.isBlank()){
      throw "Cannot save a blank track.";
    } else if (this.attributeDefaults.name === "") {
      throw "Cannot save an unnamed track";
    } else {
      TrackClientActions.createTrack(this.attributeDefaults);
    }
  },

  //TODO Add delete 

  set: function(attribute, value){
    this.attributeDefaults[attribute] = value;
  },

  get: function(attribute){
    return this.attributeDefaults[attribute];
  }

};

module.exports = Track;
