var React = require('react');
var Fluxxor = require('fluxxor');
var torque = require('torque-react');


var TorqueSlides = torque.TorqueSlides;
var TorqueSlide = torque.TorqueSlide;

var MentoringHours = require('./mentoring-hours');
var EventPanels = require('./event-panels');
var ColorView = require('./color-view');
var SSEInfo = require('./sse-info');
var SSEMeeting = require('./sse-meeting');
var EventHighlight = require('./event-highlight');
var Tour = require('./tour');

var FluxMixin = Fluxxor.FluxMixin(React);
var StoreWatchMixin = Fluxxor.StoreWatchMixin;
var TVMixin = require('../mixins/tv-mixin');

var FTV = React.createClass({
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
        <TorqueSlide>
          <SSEInfo />
        </TorqueSlide>
        <TorqueSlide>
          <SSEMeeting />
        </TorqueSlide>
        <TorqueSlide duration={5}>
          <ColorView color="black" />
        </TorqueSlide>
        <TorqueSlide>
          <EventHighlight events={this.state.events.imageEvents} current={this.state.events.current} />
        </TorqueSlide>
      </TorqueSlides>
    );
  },

  render() {
    console.log(this.state)
    if(this.state.tour) {
      return this.renderTourSlide();
    } else {
      return this.renderRealSlides();
    }
  }
});

module.exports = FTV;
