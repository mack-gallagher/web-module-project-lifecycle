import React from 'react';
import axios from 'axios';
import Form from './Form.js';
import TodoList from './TodoList.js';

const URL = 'http://localhost:9000/api/todos'

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {};
    this.state.todoList = [];
    this.toggleCompleted = this.toggleCompleted.bind(this);
  }

  toggleCompleted(id) {
    axios.patch(URL+`/${id}`)
      .then(res => {
        this.componentDidMount()
      })
      .catch(err => {
        console.error(err);
      });
  }

  componentDidMount(prevProps, prevState, snapshot) {
    axios.get(URL)
      .then(res => {
        this.setState((state,props) => {
          return (
            { ...this.state,
              todoList: res.data.data,
            }
          )
        });
      })
      .catch(err => {
        console.error(err)
      });
  }

  render() {
    return (
      <div className="App">
       <TodoList
         list={ this.state.todoList }
         toggleCompleted={ this.toggleCompleted }
       />
       <Form />
      </div>
    )
  }
}
