var React = require("react"),
    Track = require("../util/Track"),
    TrackStore = require("../stores/TrackStore"),
    TrackClientActions = require ("../actions/TrackClientActions");


var TrackPlayer = React.createClass({

  // getInitialState: function(){
  //   return({
  //     track: TrackStore.find(this.props.track.id)
  //   })
  // },

  // componentDidMount: function(){
  //   this.trackListener = TrackStore.addListener(this.getTrack);
  //   TrackClientActions.fetchSingleTrack(this.props.track.id);
  // },
  //
  // componentWillUnmount: function(){
  //   this.trackListener.remove();
  // },
  //
  // getTrack: function(){
  //   this.setState({
  //     track: TrackStore.find(this.props.track.id)
  //   });
  // },

//creating state causes console errors in the JukeBox component


  playTrack: function() {
    var track = new Track (this.props.track);
    track.play();
  },

  deleteTrack: function(){
    TrackClientActions.deleteTrack(parseInt(this.props.track.id));
    this.props.trackUpdate();
  },

  render: function() {

    return (
      <div>
        <p>{this.props.track.name}</p>
        <button onClick={this.playTrack}>Play</button>
        <button onClick={this.deleteTrack}>Delete</button>
      </div>
    );
  }
});


module.exports = TrackPlayer;
