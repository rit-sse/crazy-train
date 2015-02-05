var React = require('react');

var SSEMeeting = React.createClass({

  render() {
    return (
      <section className="container">
        <div className="gtv-event-header">
            <h3>SSE Meetings</h3>
        </div>
        <div id="meeting-img" className="info-content-with-footer" />
        <div className="info-footer">
          <h3>Monday at 11:30 AM</h3>
        </div>
      </section>
    );
  }
});

module.exports = SSEMeeting;
