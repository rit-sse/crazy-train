require('es6-promise').polyfill();
require('whatwg-fetch');

var constants = require('../constants/event');
var moment = require('moment');

function status(response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}

function json(response) {
  return response.json();
}

module.exports = {
  updateEvents() {
    fetch('/admin/events.json?limit=12')
      .then(status)
      .then(json)
      .then(response => {
        this.dispatch(constants.UPDATE_EVENTS, { events: response });
      });
  },

  updateThreeWeek() {
    var sunday = moment().day('Sunday');
    var sunday_string = sunday.toISOString();
    fetch(`/admin/events.json?start_date=${sunday_string}`)
      .then(status)
      .then(json)
      .then(response => {
        this.dispatch(constants.UPDATE_THREE_WEEK, { sunday: sunday, events: response });
      });
  },

  nextEvent() {
    this.dispatch(constants.NEXT_EVENT);
  }
};
