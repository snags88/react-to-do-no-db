var ItemComponent = React.createClass({
  render: function render () {
    return (
      <li> {this.props.item.value} </li>
    );
  }
});

module.exports = ItemComponent;
