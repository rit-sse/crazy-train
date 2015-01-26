var React = require('react');
var Fluxxor = require('fluxxor');
var torque = require('torque-react');

var TorqueSlides = torque.TorqueSlides;
var TorqueSlide = torque.TorqueSlide;
var ColorView = require('./color-view');
var EventPanels = require('./event-panels');
var MentoringHours = require('./mentoring-hours');

var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;

var FTV = React.createClass({
  mixins: [FluxMixin, StoreWatchMixin('EventStore')],

  getStateFromFlux() {
    return {
      events: this.getFlux().store('EventStore').getState()
    };
  },

  render() {
    return (
      <TorqueSlides duration={15}>
        <TorqueSlide>
          <MentoringHours />
        </TorqueSlide>
        <TorqueSlide>
          <EventPanels events={this.state.events.events} />
        </TorqueSlide>
        <TorqueSlide duration={5}>
          <ColorView color="white" />
        </TorqueSlide>
        <TorqueSlide id="sseInfo"></TorqueSlide>
        <TorqueSlide id="sseMeeting"></TorqueSlide>
        <TorqueSlide duration={5}>
          <ColorView color="black" />
        </TorqueSlide>
        <TorqueSlide id="eventHighlight"></TorqueSlide>
      </TorqueSlides>
    );
  }
});

module.exports = FTV;
