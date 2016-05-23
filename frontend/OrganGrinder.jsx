var React = require("react");
var ReactDOM = require('react-dom');
// var OrganKey = require('./components/OrganKey');
// var TONES = require('./constants/Tones');
var Organ = require('./components/Organ');
require('./util/KeyListener');

// var OrganGrinder = React.createClass({
//   render: function(){
//     return(
//       <div>
//         < Organ />
//         <div>HI EYE LOVE MUSIC</div>
//       </div>
//     );
//   }
// });

//
document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(<Organ />, document.getElementById('content'));
});
//
// <Organ />
