var constants = require('../constants/event');
var moment = require('moment');
var API = require('sse-api-client');
var Events = new API('/api/v1/').Events

module.exports = {
  updateEvents() {
    Events.all({ after: new Date(), sort: 'ASC'})
      .then(response => {
        this.dispatch(constants.UPDATE_EVENTS, { events: response.data });
      });
  },

  updateThreeWeek() {
    var sunday = moment().day('Sunday');
    var monthFromSunday = moment().day('Sunday').add(1, 'Month');
    var query = { before: monthFromSunday.toDate(), after: sunday.toDate(), page: 1, sort: 'ASC' };
    Events.all(query)
      .then(body => {
        var pages = Math.ceil(body.total/body.perPage);
        var array = [body]
        for(var i=1; i < pages; i++) {
          query.page++;
          array.push(Events.all(query));
        }
        return Promise.all(array);
      })
      .then(response => {
        var events = response.reduce((prev, body) => prev.concat(body.data), []);
        this.dispatch(constants.UPDATE_THREE_WEEK, { sunday: sunday, events });
      })
      .catch(err => console.log(err.stack))
  },

  nextEvent() {
    this.dispatch(constants.NEXT_EVENT);
  }
};
