var constants = require('../constants/event')

module.exports = {
  updateEvents() {
    var events = [];
    this.dispatch(constants.UPDATE_EVENTS, { events: events });
  },

  nextEvent() {
    this.dispatch(constants.NEXT_EVENT);
  }
};
