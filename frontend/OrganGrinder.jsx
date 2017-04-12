var React = require("react");
var ReactDOM = require('react-dom');
// var OrganKey = require('./components/OrganKey');
// var TONES = require('./constants/Tones');
var Organ = require('./components/Organ');
require('./util/KeyListener');


document.addEventListener("DOMContentLoaded", function () {
  ReactDOM.render(<Organ />, document.getElementById('content'));
});
//
// <Organ />
