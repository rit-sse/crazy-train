var React = require('react');

var Tour = React.createClass({

  onLoad(event) {
    var img = event.target;
    var theImage = new Image();
    theImage.src = img.getAttribute('src');
    if (Math.abs((theImage.height/theImage.width)-(img.height/img.width))>=0.001) {
      img.style.width = 'auto';
      img.style.height = '100%';
    }
  },

  render() {
    return (
      <section className="container" style={{position: 'relative'}}>

        <div className="gtv_img_container">
          <img className="center gtv-event-highlight" src="/assets/images/waving.gif" alt="Event Image" id="main_image" onLoad={this.onLoad} />
        </div>

        <div className="gtv-highlight-footer">
          <h3 className="center">TOUR!!!!!!!!</h3>
          <h3 className="center">Wave Pls</h3>
        </div>
      </section>
    );
  }
});

module.exports = Tour;
