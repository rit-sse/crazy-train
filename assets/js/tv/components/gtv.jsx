var React = require('react');
var Fluxxor = require('fluxxor');
var torque = require('torque-react');

var TorqueSlides = torque.TorqueSlides;
var TorqueSlide = torque.TorqueSlide;
var ColorView = require('./color-view');
var EventPanels = require('./event-panels');
var EventHighlight = require('./event-highlight');
var ThreeWeek = require('./three-week');
var Tour = require('./tour');

var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;
var TVMixin = require('../mixins/tv-mixin');

var GTV = React.createClass({
  mixins: [
            FluxMixin,
            StoreWatchMixin('EventStore'),
            TVMixin
          ],

  // componentDidMount() {
  //   var socket = require('socket.io-client')('http://sse.se.rit.edu:8000');
  //   socket.on('tour', (data) =>  {
  //     this.setState({tour: true});
  //     setTimeout(() => {
  //       this.setState({tour: false})
  //     }, 15*1000);
  //   });
  // },

  getStateFromFlux() {
    return {
      events: this.getFlux().store('EventStore').getState()
    };
  },

  renderTourSlide() {
    return (
      <TorqueSlides duration={15}>
        <TorqueSlide>
          <Tour />
        </TorqueSlide>
        <TorqueSlide>
          <Tour />
        </TorqueSlide>
      </TorqueSlides>
    );
  },

  renderRealSlides(){
    return (
      <TorqueSlides duration={30} keyboardInteractive={true}>
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
          <ThreeWeek weeks={this.state.events.threeWeek} sunday={this.state.events.sunday} />
        </TorqueSlide>
        <TorqueSlide duration={5}>
          <ColorView color="black" />
        </TorqueSlide>
      </TorqueSlides>
    );
  },

  render() {
    if(this.state.tour) {
      return this.renderTourSlide();
    } else {
      return this.renderRealSlides();
    }
  }
});

module.exports = GTV;
