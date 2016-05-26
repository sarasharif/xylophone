var React = require("react");


var TrackPlayer = React.createClass({

  playClick: function() {
    this.props.track.play();
  },

  deleteClick: function(){
    this.props.track.delete();
  },

  render: function() {
    return (
      <div>
        <p>{this.props.track.getAttribute("name")}</p>
        <button onClick={this.playClick}>Play</button>
        <button onClick={this.deleteClick}>Delete</button>
      </div>
    );
  }
});


module.exports = TrackPlayer;
