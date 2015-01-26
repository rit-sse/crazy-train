require('es6-promise').polyfill();
require('whatwg-fetch');

var constants = require('../constants/event')

module.exports = {
  updateEvents() {
    fetch('/admin/events.json?limit=12')
    .then(response => {
      if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response);
      } else {
        return Promise.reject(new Error(response.statusText));
      }
    })
    .then(response => response.json())
    .then(response => {
      this.dispatch(constants.UPDATE_EVENTS, { events: response });
    });
  },

  nextEvent() {
    this.dispatch(constants.NEXT_EVENT);
  }
};
