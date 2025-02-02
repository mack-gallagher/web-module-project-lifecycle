import React from 'react'

export default class Todo extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div
        className={ this.props.completed.toString() }
        id={ this.props.id }
        onClick={ (evt) => this.props.toggleCompleted(this.props.id) }
      >
        <p>
          { this.props.name }
        </p>
      </div>
    );
  }
}
