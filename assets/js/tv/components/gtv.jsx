var React = require('react');
var Fluxxor = require('fluxxor');
var torque = require('torque-react');

var TorqueSlides = torque.TorqueSlides;
var TorqueSlide = torque.TorqueSlide;

var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var GTV = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin('EventStore')],

  getStateFromFlux() {
    return {
      events: this.getFlux().store('EventStore').getState()
    };
  },

  render() {
    return (
      <TorqueSlides duration={30}>
        <TorqueSlide id="eventPanels"></TorqueSlide>
        <TorqueSlide id="whiteView" duration={5}></TorqueSlide>
        <TorqueSlide id="eventHighlight" duration={15}></TorqueSlide>
        <TorqueSlide id="threeWeek"></TorqueSlide>
        <TorqueSlide id="blackView" duration={5}></TorqueSlide>
      </TorqueSlides>
    );
  }
});

module.exports = GTV;
