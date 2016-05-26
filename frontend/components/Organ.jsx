var React = require("react"),
    ReactDOM = require("react-dom"),
    Recorder = require("./Recorder"),
    JukeBox = require("./JukeBox"),
    OrganKey = require("./OrganKey"),


    TONES = require("../constants/Tones.js");

var Organ = React.createClass({

  render: function() {
    var i = 0;

    return (
      <div>
        <div className="organ">
          {
            Object.keys(TONES).map(function(tone){
            i++;
            return <OrganKey note={tone} key={i}/>;
            })
          }
        </div>
        <div className="recorder"><Recorder /></div>
        <JukeBox />
    </div>
    );
  }

});

module.exports = Organ;
