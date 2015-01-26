var Fluxxor = require('fluxxor');
var constants = require('../constants/event');

var EventStore = Fluxxor.createStore({
  initialize() {
    this.events = [];
    this.imageEvents = [];
    this.threeWeek = [];
    this.current = 0;

    this.bindActions(
      constants.UPDATE_EVENTS, this.onUpdateEvents,
      constants.UPDATE_THREE_WEEK, this.onUpdateThreeWeek,
      constants.NEXT_EVENT, this.onNextEvent
    );
  },

  onUpdateEvents(payload) {
    this.events = payload.events;
    this.imageEvents = payload.events.filter( (event) => {
      return event.image && event.image.url && event.image.url.length > 0;
    });
    if(this.current >= this.imageEvents.length) {
      this.current = 0;
    }
    this.emit('change');
  },

  onUpdateThreeWeek(payload) {
    this.threeWeek = payload.events;
    this.sunday = payload.sunday;
    this.emit('change');
  },

  onNextEvent() {
    this.current = (this.current + 1) % this.imageEvents.length;
    this.emit('change');
  },

  getState() {
    return {
      events: this.events,
      imageEvents: this.imageEvents,
      current: this.current,
      threeWeek: this.threeWeek
    };
  }
});

module.exports = EventStore;
