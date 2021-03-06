(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var TodoForm = React.createClass({
  displayName: 'TodoForm',

  render: function render() {
    return React.createElement(
      'form',
      { onSubmit: this.handleSubmit },
      React.createElement('input', {
        type: 'text',
        placeholder: 'Add item...',
        value: this.state.value,
        onChange: this.handleChange
      }),
      React.createElement('input', {
        type: 'submit',
        value: 'Add' })
    );
  },

  getInitialState: function getInitialState() {
    return { value: '', checked: false };
  },

  handleChange: function handleChange(e) {
    this.setState({ value: e.target.value });
  },

  handleSubmit: function handleSubmit(e) {
    e.preventDefault();
    this.props.handleNewRecord(this.state);
    this.setState(this.getInitialState());
  }
});

module.exports = TodoForm;

},{}],2:[function(require,module,exports){
'use strict';

var ItemComponent = React.createClass({
  displayName: 'ItemComponent',

  render: function render() {
    if (this.state.edit) {
      return this.editView();
    } else {
      return this.readView();
    }
  },

  readView: function readView() {
    this.removeOffClickListener();

    return React.createElement(
      'li',
      null,
      React.createElement(
        'div',
        { onClick: this.toggleEdit, ref: 'edit' },
        ' ',
        this.props.item.value,
        ' '
      ),
      React.createElement(
        'button',
        {
          onClick: this.handleDelete
        },
        'Delete'
      ),
      React.createElement('input', {
        type: 'checkbox',
        onChange: this.handleUpdate,
        checked: this.props.item.checked,
        ref: 'check' }),
      ' ',
      this.checkedMessage()
    );
  },

  editView: function editView() {
    this.addOffClickListener();

    return React.createElement(
      'li',
      null,
      React.createElement('input', {
        type: 'text',
        value: this.props.item.value,
        onChange: this.handleUpdate,
        ref: 'edit' }),
      React.createElement(
        'button',
        {
          onClick: this.handleDelete
        },
        'Delete'
      ),
      React.createElement('input', {
        type: 'checkbox',
        onChange: this.handleUpdate,
        checked: this.props.item.checked,
        ref: 'check' }),
      ' ',
      this.checkedMessage()
    );
  },

  addOffClickListener: function offClickListener() {
    var el = document.getElementsByTagName('body')[0];
    el.addEventListener('click', this.bodyClickHandler);
  },

  removeOffClickListener: function offClickListener() {
    var el = document.getElementsByTagName('body')[0];
    el.removeEventListener('click', this.bodyClickHandler);
  },

  bodyClickHandler: function bodyClickHandler(e) {
    if (e.target !== this.refs.edit) {
      this.toggleEdit();
    }
  },

  checkedMessage: function checkedMessage() {
    if (this.props.item.checked) {
      return 'Checked!';
    } else {
      return 'Unchecked';
    }
  },

  getInitialState: function getInitialState() {
    return { edit: false };
  },

  toggleEdit: function toggleEdit(e) {
    this.setState({ edit: !this.state.edit });
  },

  handleDelete: function handleDelete(e) {
    e.preventDefault();
    this.props.removeRecord(this.props.item);
  },

  handleUpdate: function handleCheck(e) {
    var data = {
      value: this.refs.edit.value || this.props.item.value,
      checked: this.refs.check.checked
    };

    var newRecord = Object.assign(this.props.item, data);
    this.props.updateRecord(this.props.item, newRecord);
  }
});

module.exports = ItemComponent;

},{}],3:[function(require,module,exports){
'use strict';

var TodoForm = require('./form.jsx'),
    ItemComponent = require('./item.jsx');

var MainComponent = React.createClass({
  displayName: 'MainComponent',

  render: function render() {
    var self = this;
    return React.createElement(
      'div',
      null,
      React.createElement(TodoForm, { handleNewRecord: this.addRecord }),
      React.createElement(
        'ol',
        null,
        this.state.records.map(function (record, i) {
          return React.createElement(ItemComponent, { item: record, key: i, removeRecord: self.removeRecord, updateRecord: self.updateRecord });
        })
      )
    );
  },

  getInitialState: function getInitialState() {
    return { records: [] };
  },

  addRecord: function addRecord(record) {
    var records = this.state.records;
    records.push(record);
    this.setState({ records: records });
  },

  removeRecord: function removeRecord(record) {
    var records = this.state.records;
    var index = this.state.records.indexOf(record);
    records.splice(index, 1);
    this.setState({ records: records });
  },

  updateRecord: function updateRecord(record, data) {
    var records = this.state.records;
    var index = this.state.records.indexOf(record);
    records.splice(index, 1, data);
    this.setState({ records: records });
  }
});

module.exports = MainComponent;

},{"./form.jsx":1,"./item.jsx":2}],4:[function(require,module,exports){
'use strict';

var MainComponent = require('./components/main.jsx');

ReactDOM.render(React.createElement(MainComponent, null), document.getElementById('js--todo'));

},{"./components/main.jsx":3}]},{},[4])