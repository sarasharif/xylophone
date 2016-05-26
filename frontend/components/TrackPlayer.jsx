var React = require("react");


var TrackPlayer = React.createClass({

  playTrack: function() {
    this.props.track.play();
  },

  deleteTrack: function(){
    this.props.track.delete();
  },

  render: function() {
    return (
      <div>
        <p>{this.props.track.getAttribute("name")}</p>
        <button onClick={this.playTrack}>Play</button>
        <button onClick={this.deleteTrack}>Delete</button>
      </div>
    );
  }
});


module.exports = TrackPlayer;
