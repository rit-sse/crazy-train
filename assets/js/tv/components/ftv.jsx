var React = require('react');
var Fluxxor = require('fluxxor');
var torque = require('torque-react');

var TorqueSlides = torque.TorqueSlides;
var TorqueSlide = torque.TorqueSlide;

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
        <TorqueSlide id="mentoringHours"></TorqueSlide>
        <TorqueSlide id="eventPanels"></TorqueSlide>
        <TorqueSlide id="whiteView" duration={5}></TorqueSlide>
        <TorqueSlide id="sseInfo"></TorqueSlide>
        <TorqueSlide id="sseMeeting"></TorqueSlide>
        <TorqueSlide id="blackView" duration={5}></TorqueSlide>
        <TorqueSlide id="eventHighlight"></TorqueSlide>
      </TorqueSlides>
    );
  }
});

module.exports = FTV;
