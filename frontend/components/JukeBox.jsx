var React = require('react'),
    TrackStore = require('../stores/TrackStore'),
    TrackApiUtil = require('../util/TrackApiUtil'),
    TrackClientActions = require('../actions/TrackClientActions'),
    TrackPlayer = require('../components/TrackPlayer');

var JukeBox = React.createClass({

  getInitialState: function(){
    return {
      tracks: TrackStore.all()
    };
  },

  componentDidMount: function(){
    this.trackListener = TrackStore.addListener(this.handleChange);
    TrackClientActions.fetchAllTracks();
  },

  componentWillUnmount: function(){
    this.trackListener.remove();
  },

  handleChange: function(){
    this.setState({
      tracks: TrackStore.all()
    });
  },

  render: function(){
    return (
      <div>
        <h3>XYLOPHONE JAMS JUKEBOX</h3>
        {
          this.state.tracks.map(function (track) {
            return <TrackPlayer key={track.getAttribute("id")} track={track}/>
          })
        }
      </div>
    );
  }

});

module.exports = JukeBox;
