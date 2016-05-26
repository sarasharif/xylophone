var React = require('react'),
    TrackStore = require('../stores/TrackStore'),
    TrackApiUtil = require('../util/TrackApiUtil'),
    TrackClientActions = require('../actions/TrackClientActions'),
    TrackPlayer = require('../components/TrackPlayer');

var JukeBox = React.createClass({

  getInitialState: function(){
    return {
      tracks: []
    };
  },

  componentDidMount: function(){
    this.trackListener = TrackStore.addListener(this.getTracks);
    TrackClientActions.fetchAllTracks();
  },

  componentWillUnmount: function(){
    this.trackListener.remove();
  },

  getTracks: function(){
    this.setState({
      tracks: TrackStore.all()
    });
  },

  render: function(){
    var trackUpdate = this.getTracks;
    return (
      <div>
        <h3>XYLOPHONE JAMS JUKEBOX</h3>
        {
          this.state.tracks.map(function (track) {
            return (
              <TrackPlayer key={track.id} track={track} trackUpdate={trackUpdate}/>
              )
          })
        }
      </div>
    );
  }

});

module.exports = JukeBox;
