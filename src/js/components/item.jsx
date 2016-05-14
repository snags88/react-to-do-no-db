var ItemComponent = React.createClass({
  render: function render () {
    var checked;
    if (this.props.item.checked) {
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
        <input
          type='checkbox'
          onChange={this.handleUpdate}
          checked={this.props.item.checked}
          ref='check' /> {checked}
      </li>
    );
  },

  handleDelete: function handleDelete (e) {
    e.preventDefault();
    this.props.removeRecord(this.props.item)
  },

  handleUpdate: function handleCheck (e) {
    var data = {
      checked: this.refs.check.checked
    };

    var newRecord = Object.assign(this.props.item, data);
    this.props.updateRecord(this.props.item, newRecord);
  }
});

module.exports = ItemComponent;
