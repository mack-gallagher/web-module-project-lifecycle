import React from 'react'

export default class Form extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.state.value = '';

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(evt) {
    this.props.handleSubmit(evt);
    this.setState({ value: '' });
  }

  render() {
    return (
      <form className='Form' onSubmit={ this.onSubmit }>
        <label>
          Enter a to do item:
          <input 
            onChange={ (evt) => this.setState({ value: evt.target.value }) }
            value={ this.state.value }
          />
          <button
            onClick={ this.props.clearCompleted }
          >
            Clear Completed
          </button>
          <button
            type='submit'
          >
            Add Todo
          </button>
        </label>
      </form>
    )
  }
}
