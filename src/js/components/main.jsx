var TodoForm = require('./form.jsx')
  , ItemComponent = require('./item.jsx')
  ;

var MainComponent = React.createClass({
  render: function render () {
    var self = this;
    return (
      <div>
        <TodoForm handleNewRecord = {this.addRecord} />
        <ol>
          {
            this.state.records.map(function(record, i) {
              return <ItemComponent item = {record} key={i} removeRecord={self.removeRecord} updateRecord={self.updateRecord}/>;
            })
          }
        </ol>
      </div>
    );
  },

  getInitialState: function getInitialState () {
    return { records: [] };
  },

  addRecord: function addRecord (record) {
    var records = this.state.records;
    records.push(record);
    this.setState({records: records});
  },

  removeRecord: function removeRecord (record) {
    var records = this.state.records;
    var index = this.state.records.indexOf(record);
    records.splice(index, 1);
    this.setState({records: records})
  },

  updateRecord: function updateRecord (record, data) {
    var records = this.state.records;
    var index = this.state.records.indexOf(record);
    records.splice(index, 1, data);
    this.setState({records: records})
  }
});

module.exports = MainComponent;
