var ItemComponent = React.createClass({
  render: function render () {
    return (
      <li>
        <div> {this.props.item.value} </div>
        <button
          onClick = {this.handleDelete}
        >
          Delete
        </button>
      </li>
    );
  },

  handleDelete: function handleDelete (e) {
    e.preventDefault();
    this.props.removeRecord(this.props.item)
  }
});

module.exports = ItemComponent;
