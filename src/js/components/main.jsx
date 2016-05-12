var TodoForm = require('./form.jsx')
  , ItemComponent = require('./item.jsx')
  ;

var MainComponent = React.createClass({
  render: function render () {
    return (
      <div>
        <TodoForm handleNewRecord = {this.addRecord} />
        <ol>
          {
            this.state.records.map(function(record, i) {
              return <ItemComponent item = {record} key={i} />;
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
  }
});

module.exports = MainComponent;
