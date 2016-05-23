var React = require("react"),
    KeyActions = require("../actions/KeyActions.js"),
    KeyStore = require("../stores/KeyStore.js"),
    Note = require("../util/Note.js"),
    Tones = require("../constants/Tones.js");

var OrganKey = React.createClass({
  getInitialState: function(){
    return {playing: false};
  },

  componentDidMount: function(){
    KeyStore.addListener(this.updateState);
  },

  componentWillUnmount: function(){
    this.currentNote.stop();
      // this.state.notes.splice(index, 1);
  },

  updateState: function(){
    this.setState({playing: KeyStore.playing(this.props.note)});
  },

  sound: function(){
    this.currentNote = this.currentNote || new Note(Tones[this.props.note]);

    if (this.state.playing) {
      this.currentNote.start();
    } else {
      this.currentNote.stop();
    }
  },
  render: function(){
    this.sound();
    if (this.props.note.length > 2) {
      var classy = "ivory";
    } else {
      var classy = "ivory";
    }

    return (
      <div className={classy}>
        <div className="top-nail"></div>

        <div className="bottom-nail"></div>
      </div>
    );
  }
});

// {JSON.stringify(this.state.playing)}
// {JSON.stringify(this.currentNote)}
module.exports = OrganKey;
