var React = require('react/addons');
var moment = require('moment');

var ThreeWeek = React.createClass({

  format(date) {
    if(date) {
      return date.format('M/DD');
    }else {
      return "";
    }
  },

  renderWeeks() {
    return this.props.weeks.map((week, i) => {
      return (
          <tr key={`week-${i}`}>
            <td className="gtv-calendar-weekcol"><h3>{ this.format(week[0].date) }</h3></td>
            { this.renderDays(week, i) }
          </tr>
        );
    });
  },

  renderDays(week, i) {
    return week.map((day, j) => {
      var cx = React.addons.classSet;
      var classes = cx({
        today: moment().isSame(day.date, 'day')
      });
      return (
        <td key={`day-${i}-${j}`} className={classes}>
          <ul className="gtv-calendar-eventlist">
            { this.renderEvents(day, i , j) }
          </ul>
        </td>
      );
    });
  },

  renderEvents(day, i, j) {
    return day.events.map((event, k) => {
      return <li key={`event-${i}-${j}-${k}`}>{ event.short_name }</li>
    });
  },

  render() {
    return (
      <section className="container">
        <table>
          <thead>
            <tr>
              <th className="gtv-calendar-weekcol"><h3>Wk</h3></th>
              <th><h3>Sun</h3></th>
              <th><h3>Mon</h3></th>
              <th><h3>Tue</h3></th>
              <th><h3>Wed</h3></th>
              <th><h3>Thu</h3></th>
              <th><h3>Fri</h3></th>
              <th><h3>Sat</h3></th>
            </tr>
          </thead>

          <tbody>
            { this.renderWeeks() }
          </tbody>
        </table>
      </section>
    );
  }
});

module.exports = ThreeWeek;
