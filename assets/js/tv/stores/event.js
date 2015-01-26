var Fluxxor = require('fluxxor');
var constants = require('../constants/event');

var EventStore = Fluxxor.createStore({
  initialize() {
    this.events = [];
    this.three_week = [];
    this.current = 0;

    this.bindActions(
      constants.UPDATE_EVENTS, this.onUpdateEvents,
      constants.UPDATE_THREE_WEEK, this.onUpdateThreeWeek,
      constants.NEXT_EVENT, this.onNextEvent
    );
  },

  onUpdateEvents(payload) {
    this.events = payload.events;
    if(this.current >= this.events.length) {
      this.current = 0;
    }
    this.emit('change');
  },

  onUpdateThreeWeek(payload) {
    this.three_week = payload.events;
    this.sunday = payload.sunday;
    this.emit('change');
  },

  onNextEvent() {
    this.current = (this.current + 1) % this.events.length;
    this.emit('change');
  },

  getState() {
    return {
      events: this.events,
      current: this.current,
      three_week: this.three_week
    };
  }
});

module.exports = EventStore;
