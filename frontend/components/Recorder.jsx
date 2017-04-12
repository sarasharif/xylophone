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


  recordingMessage: function () {
    if (this.isRecording()) {
      return <i className="fa fa-circle fa-stack-1x turn-red"></i>;
    } else {
      return <i className="fa fa-circle fa-stack-1x"></i>;
    }
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

  stopTrack: function (event) {
    window.location.reload();
  },

  render: function () {
    return (
      <div className="recorder-buttons">
        <button className="fa-stack" title="RECORD" onClick={this.handleRecordClick}>
          <i className="fa fa-circle-o fa-stack-1x"></i>
          { this.recordingMessage() }
        </button>

        <button className="fa-stack" title="PLAY" onClick={this.handlePlayClick} >
          <i className="fa fa-play-circle-o fa-stack-1x"></i>
        </button>

        <button className="fa-stack" title="SAVE" onClick={this.saveTrack} >
          <i className="fa fa-floppy-o fa-stack-1x"></i>
        </button>

        <button className="fa-stack" title="STOP" onClick={this.stopTrack} >
          <i className="fa fa-stop fa-stack-1x"></i>
        </button>
      </div>
    );
  }

});

module.exports = Recorder;
