var React = require('react');
var flux = require('./flux');

var GTV = require('./components/gtv');

React.render(<GTV flux={flux} />, document.getElementById("app"));
