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
    if (this.isRecording()) { return <i className="fa fa-dot-circle-o turn-red"></i>; }
    else { return <i className="fa fa-dot-circle-o"></i>; }
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
      <div className="recorder-buttons">
        <button title="RECORD" onClick={this.handleRecordClick}>
          { this.recordingMessage() }
        </button>

        <button title="PLAY" onClick={this.handlePlayClick} >
          <i className="fa fa-play-circle-o"></i>
        </button>

        <button title="SAVE" onClick={this.saveTrack} >
          <i className="fa fa-floppy-o"></i>
        </button>
      </div>
    );
  }

});

module.exports = Recorder;
