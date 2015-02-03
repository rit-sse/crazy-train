module.exports =  {
  componentWillMount() {
    this.getFlux().actions.event.updateEvents();
    this.getFlux().actions.event.updateThreeWeek();
    this.intervals = [];
  },

  setInterval() {
    this.intervals.push(setInterval.apply(null, arguments));
  },

  componentWillUnmount() {
    this.intervals.map(clearInterval);
  },

  componentDidMount() {
    this.setInterval(this.getFlux().actions.event.updateEvents, 30000);
    this.setInterval(this.getFlux().actions.event.updateThreeWeek, 30000);
  }
};
