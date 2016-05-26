var React = require("react"),
    ReactDOM = require("react-dom"),
    Recorder = require("./Recorder"),
    JukeBox = require("./JukeBox"),
    OrganKey = require("./OrganKey"),


    TONES = require("../constants/Tones.js");

var Organ = React.createClass({

  render: function() {

    return (
      <div>
        <div className="organ">
          {
            Object.keys(TONES).map(function(tone){
            return <OrganKey note={tone} />;
            })
          }
        </div>
        <Recorder/>
        <JukeBox/>
    </div>
    );
  }

});

module.exports = Organ;
