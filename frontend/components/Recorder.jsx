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
    if (this.isTrackNew() || this.state.isRecording){ return false; }
    return true;
  },

  //TODO we will actually refactor/change this function to render
  //clear/red depending on recording/not recording
  recordingMessage: function () {
    if (this.isRecording()) { return "Stop Recording"; }
    else { return "Start Recording"; }
  },

  handleRecordClick: function(event){
    if (this.state.isRecording) {
      this.state.track.stopRecording();
      this.setState({ isRecording: false });
    } else {
      this.setState({ isRecording: true });
      this.state.track.startRecording();
    }
  },

  handlePlayClick: function(){
    if(!this.isTrackNew()){
      this.state.track.play();
    }
  },

//TODO reconfigure this to always show save button but only allow to save if isDoneRecording is true
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
    if (!this.isDoneRecording()) {
      alert("Nothing to save here.")
    } else {
      this.state.track.setAttribute("name", prompt("Name your song!"));
      this.state.track.save();
    }
  },

  render: function () {
    return (
      <div>
        <h3>Record & Play Jams!</h3>

        <button onClick={this.handleRecordClick}>
          { this.recordingMessage() }
        </button>

        <button onClick={this.handlePlayClick} >
          Play
        </button>

        <button onClick={this.saveTrack} >
          Save Your Song
        </button>

      </div>
    );
  }

});

module.exports = Recorder;
