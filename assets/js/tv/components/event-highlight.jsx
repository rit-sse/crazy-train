var React = require('react');
var moment = require('moment');
var Fluxxor = require('fluxxor');
var FluxMixin = Fluxxor.FluxMixin(React);

var EventHighlight = React.createClass({

  mixins: [FluxMixin],

  dateString(event) {
    if(event) {
      return moment(event.start_date).format('MMMM D, h:mm a') + ' @ ' + event.location;
    } else {
      return "";
    }
  },

  handleVisible() {
    this.getFlux().actions.event.nextEvent();
  },

  render() {

    var event = this.props.events[this.props.current];

    return (
      <section className="container" style="position: relative">

        <div className="gtv_img_container">
          <img className="center" src={`/admin${event.image.url}`} alt="Event Image" className="gtv-event-highlight" id="main-image" />
        </div>

        <div className="gtv-highlight-footer">
          <h3 className="center">{ dateString(event) }</h3>
        </div>
      </section>
    );
  }
});
