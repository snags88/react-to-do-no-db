var ItemComponent = React.createClass({
  render: function render () {
    var checked;
    if (this.state.checked) {
      checked = 'Checked!';
    } else {
      checked = 'Unchecked';
    }

    return (
      <li>
        <div> {this.props.item.value} </div>
        <button
          onClick = {this.handleDelete}
        >
          Delete
        </button>
        <input type = 'checkbox' onChange = {this.handleUpdate} ref = 'check' />
        <div>{checked}</div>
      </li>
    );
  },

  getInitialState: function getInititalState () {
    return {checked: this.props.item.checked};
  },

  handleDelete: function handleDelete (e) {
    e.preventDefault();
    this.props.removeRecord(this.props.item)
  },

  handleCheck: function handleCheck (e) {
    data = {
      checked: ReactDOM.findDOMNode(this.refs.check).checked
    };

    newRecord = Object.assign(data, this.props.item);
    this.props.updateRecord(this.props.item, newRecord);
  }
});

module.exports = ItemComponent;
