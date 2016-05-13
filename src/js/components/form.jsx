var TodoForm = React.createClass({
  render: function render () {
    return (
      <form onSubmit = {this.handleSubmit} >
        <input
          type = 'text'
          placeholder = 'Add item...'
          value = {this.state.value}
          onChange = {this.handleChange}
        />
        <input
          type = 'submit'
          value = 'Add' />
      </form>
    );
  },

  getInitialState: function getInitialState () {
    return { value: '', checked: false };
  },

  handleChange: function handleChange (e) {
    this.setState({value: e.target.value})
  },

  handleSubmit: function handleSubmit (e) {
    e.preventDefault();
    this.props.handleNewRecord(this.state);
    this.setState(this.getInitialState());
  }
});

module.exports = TodoForm;
