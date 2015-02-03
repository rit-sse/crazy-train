var Fluxxor = require('fluxxor');
var stores = require('./stores');
var actions = require('./actions');

var app = new Fluxxor.Flux(stores, actions);

module.exports = app;
