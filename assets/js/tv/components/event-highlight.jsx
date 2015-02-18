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

  imageUrl(event) {
    if(event) {
      return event.image.url;
    } else {
      return "";
    }
  },

  onLoad(event) {
    var img = event.target;
    var theImage = new Image();
    theImage.src = img.getAttribute('src');
    if (Math.abs((theImage.height/theImage.width)-(img.height/img.width))>=0.001) {
      img.style.width = 'auto';
      img.style.height = '100%';
    }
  },

  handleVisible() {
    this.getFlux().actions.event.nextEvent();
  },

  render() {

    var event = this.props.events[this.props.current];
    return (
      <section className="container" style={{position: 'relative'}}>

        <div className="gtv_img_container">
          <img className="center gtv-event-highlight" src={`/admin${this.imageUrl(event)}`} alt="Event Image" id="main_image" onLoad={this.onLoad} />
        </div>

        <div className="gtv-highlight-footer">
          <h3 className="center">{ event.short_name }</h3>
          <h3 className="center">{ this.dateString(event) }</h3>
        </div>
      </section>
    );
  }
});

module.exports = EventHighlight;
