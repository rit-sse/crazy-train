var React = require('react');
var moment = require('moment');

var EventPanels = React.createClass({

  isOneDay(event) {
    return moment(event.start_date).isSame(moment(event.end_date), 'day');
  },

  fullStartDay(event) {
    return moment(event.start_date).format('dddd, MMMM D');
  },

  timeRange(event) {
    return moment(event.start_date).format('h:mm a') + " to " + moment(event.end_date).format('h:mm a');
  },

  startDay(event) {
    return moment(event.start_date).format("MMMM D") + ", " + moment(event.start_date).format('h:mm a');
  },

  endDay(event) {
    return moment(event.end_date).format("MMMM D") + ", " + moment(event.end_date).format('h:mm a');
  },

  renderInner(event) {
    if(this.isOneDay(event)){
      return (
        <div>
          <div className="gtv-event-data">
            <span>{ this.fullStartDay(event) }</span>
          </div>
          <div className="gtv-event-data">
            <span>{ this.timeRange(event) }</span>
          </div>
          <div className="gtv-event-data faded">
            <span>{ event.location }</span>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div className="gtv-event-data">
            <span>{ this.startDay(event) }} to</span>
          </div>
          <div className="gtv-event-data">
            <span>{ this.endDay(event) }</span>
          </div>
          <div className="gtv-event-data faded">
            <span>{ event.location }</span>
          </div>
        </div>
      );
    }
  },

  render() {
    var events = [
      this.props.events.slice(0, 4),
      this.props.events.slice(4, 8),
      this.props.events.slice(8, 12)
    ];

    return (
      <section className="container">
        <div className="gtv-event-header">
          <h3>Upcoming Events</h3>
        </div>
        { events.map((eventSet, i) => {
          return (
            <div key={`wrapper${i}`} id={`wrapper${i}`} className="gtv-panel-wrapper">
              <div className="gtv-event-panel">
                { eventSet.map((event, j) => {
                  return (
                    <div className="gtv-event" id={`event-${i}-${j}`} key={`event-${i}-${j}`}>
                      <div className="gtv-event-title">
                        { event.short_name }
                      </div>
                      { this.renderInner(event) }
                    </div>
                  );
                }) }
              </div>
            </div>
          );
        }) }
      </section>
    );
  }
});

module.exports = EventPanels;
