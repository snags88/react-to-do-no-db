var ItemComponent = React.createClass({
  render: function render () {
    if (this.state.edit) {
      return this.editView();
    } else {
      return this.readView();
    }
  },

  readView: function readView () {
    this.removeOffClickListener();

    return (
      <li>
        <div onClick = {this.toggleEdit} ref='edit'> {this.props.item.value} </div>
        <button
          onClick = {this.handleDelete}
        >
          Delete
        </button>
        <input
          type='checkbox'
          onChange={this.handleUpdate}
          checked={this.props.item.checked}
          ref='check' /> {this.checkedMessage()}
      </li>
    );
  },

  editView: function editView () {
    this.addOffClickListener();

    return (
      <li>
        <input
          type = 'text'
          value = {this.props.item.value}
          onChange = {this.handleUpdate}
          ref = 'edit'/>
        <button
          onClick = {this.handleDelete}
        >
          Delete
        </button>
        <input
          type='checkbox'
          onChange={this.handleUpdate}
          checked={this.props.item.checked}
          ref='check' /> {this.checkedMessage()}
      </li>
    );
  },

  addOffClickListener: function offClickListener () {
    var el = document.getElementsByTagName('body')[0];
    el.addEventListener('click', this.bodyClickHandler)
  },

  removeOffClickListener: function offClickListener () {
    var el = document.getElementsByTagName('body')[0];
    el.removeEventListener('click', this.bodyClickHandler);
  },

  bodyClickHandler: function bodyClickHandler (e) {
    if (e.target !== this.refs.edit) {
      this.toggleEdit();
    }
  },

  checkedMessage: function checkedMessage () {
    if (this.props.item.checked) {
      return 'Checked!';
    } else {
      return 'Unchecked';
    }
  },

  getInitialState: function getInitialState () {
    return {edit: false};
  },

  toggleEdit: function toggleEdit (e) {
    this.setState({edit: !this.state.edit});
  },

  handleDelete: function handleDelete (e) {
    e.preventDefault();
    this.props.removeRecord(this.props.item)
  },

  handleUpdate: function handleCheck (e) {
    var data = {
      value: this.refs.edit.value || this.props.item.value,
      checked: this.refs.check.checked
    };

    var newRecord = Object.assign(this.props.item, data);
    this.props.updateRecord(this.props.item, newRecord);
  }
});

module.exports = ItemComponent;
