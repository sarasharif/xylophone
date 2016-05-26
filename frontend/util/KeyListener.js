var KeyActions = require("../actions/KeyActions"),
    Tones = require("../constants/Tones");

$(document).on("keyup", function(event){
  var note = Mapping[event.keyCode];
  KeyActions.removeKey(note);

});

$(document).on("keydown", function(event){

  var note = Mapping[event.keyCode];
  KeyActions.addKey(note);

});


var Mapping = {
  65: 'C4',
  87: 'Db4',
  83: 'D4',
  69: 'Eb4',
  68: 'E4',
  70: 'F4',
  85: 'Gb4',
  74: 'G4',
  73: 'Ab4',
  75: 'A4',
  79: 'Bb4',
  76: 'B4',
  186: 'C5'
};
