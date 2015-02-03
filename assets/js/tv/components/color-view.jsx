var React = require('react');

var ColorView = React.createClass({
  render() {
    var style = {
      backgroundColor: this.props.color
    };
    return <section className="container" style={ style } />;
  }
});

module.exports = ColorView;
