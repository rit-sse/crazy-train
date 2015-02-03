var React = require('react');
var Fluxxor = require('fluxxor');
var torque = require('torque-react');

var TorqueSlides = torque.TorqueSlides;
var TorqueSlide = torque.TorqueSlide;
var ColorView = require('./color-view');
var EventPanels = require('./event-panels');
var EventHighlight = require('./event-highlight');
var ThreeWeek = require('./three-week');

var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;
var TVMixin = require('../mixins/tv-mixin');

var GTV = React.createClass({
  mixins: [
            FluxMixin,
            StoreWatchMixin('EventStore'),
            TVMixin
          ],

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
        <TorqueSlide duration={15}>
          <EventHighlight events={this.state.events.imageEvents} current={this.state.events.current} />
        </TorqueSlide>
        <TorqueSlide>
          <ThreeWeek weeks={this.state.events.threeWeek} />
        </TorqueSlide>
        <TorqueSlide duration={5}>
          <ColorView color="black" />
        </TorqueSlide>
      </TorqueSlides>
    );
  }
});

module.exports = GTV;
