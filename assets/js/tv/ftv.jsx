var React = require('react');
var flux = require('./flux');

var FTV = require('./components/ftv');

React.render(<FTV flux={flux} />, document.getElementById("app"));
