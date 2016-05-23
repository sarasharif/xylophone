var React = require("react"),
    ReactDOM = require("react-dom"),
    OrganKey = require("./OrganKey"),
    TONES = require("../constants/Tones.js");

var Organ = React.createClass({

  render: function() {
    
    return (<div className="organ">
      {Object.keys(TONES).map(function(tone){
        return <OrganKey note={tone}/>;
      })}
    </div>);
  }

});

module.exports = Organ;
