var React = require('react');
var Fluxxor = require('fluxxor');
var torque = require('torque-react');

var TorqueSlides = torque.TorqueSlides;
var TorqueSlide = torque.TorqueSlide;
var ColorView = require('./color-view');
var EventPanels = require('./event-panels');

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
        <TorqueSlide>
          <EventPanels events={this.state.events.events} />
        </TorqueSlide>
        <TorqueSlide duration={5}>
          <ColorView color="white" />
        </TorqueSlide>
        <TorqueSlide id="eventHighlight" duration={15}></TorqueSlide>
        <TorqueSlide id="threeWeek"></TorqueSlide>
        <TorqueSlide duration={5}>
          <ColorView color="black" />
        </TorqueSlide>
      </TorqueSlides>
    );
  }
});

module.exports = GTV;
