var React = require('react');

var MentoringHours = React.createClass({

  render() {
    return (
      <section className="container">
        <div className="tv-left-right">
          <div className="tv-left">
            <img src="/assets/images/mentoring.png"/>
          </div>
          <div className="tv-right huge">
            <div className="tv-inner">
              Need some help?
              <br />
              <br />
              Official mentoring hours:
              <br />
              <b>Weekdays, 10am-6pm</b>
              <br />
              <br />
              Unofficial hours:
              <br />
              <b>Whenever we're open</b>
            </div>
          </div>
        </div>
      </section>
    );
  }
});

module.exports = MentoringHours;
