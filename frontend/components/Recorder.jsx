var React = require('react'),
    Track = require("../util/Track"),
    KeyStore = require('../stores/KeyStore');


var Recorder = React.createClass({
  getInitialState: function(){
    return {
      isRecording: false,
      track: new Track()
    };
  },

  componentDidMount: function(){
    this.keyListener = KeyStore.addListener(this._keysChanged);
  },

  componentWillUnmount: function(){
    this.keyListener.remove();
  },

  _keysChanged: function(){
    if (this.state.isRecording){
      this.state.track.addNotes(KeyStore.all());
    }
  },

  isRecording: function(){
    return this.state.isRecording;
  },

  isTrackNew: function(){
    return this.state.track.isBlank();
  },

  isDoneRecording: function(){
    return !this.isTrackNew && !this.state.isRecording;
  },

  recordingMessage: function () {
    if (this.isRecording()) {
      return "Stop Recording";
    } else if (this.isDoneRecording()) {
      return "Finished Recording";
    } else {
      return "Start Recording";
    }
  },

  recordClick: function(event){
    if (this.state.isRecording) {
      this.state.track.stopRecording();
      this.setState({ isRecording: false });
    } else {
      this.setState({ isRecording: true });
      this.state.track.startRecording();
    }
  },

  playClick: function(){
    if(!this.isTrackNew()){
      this.state.track.play();
    }
  },

  trackSavingElements: function () {
    if (this.isDoneRecording()) {
      return (
        <button onClick={this.saveTrack} >
          Save Your Song
        </button>
      );
    }
  },

  saveTrack: function (event) {
    this.state.track.set("name", prompt("Name your song!"));
    this.state.track.save();
  },

  render: function () {
    return (
      <div>
        <h3>Record your Jams!</h3>
        <button onClick={this.recordClick} className="record-button">
          { this.recordingMessage() }
        </button>
        { this.trackSavingElements() }
        <button onClick={this.playClick} >
          Play
        </button>
      </div>
    );
  }

});

module.exports = Recorder;
