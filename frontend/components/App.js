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
    this.clearCompleted = this.clearCompleted.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleCompleted(id) {
    axios.patch(URL+`/${id}`)
      .then(res => {
        this.componentDidMount();
      })
      .catch(err => {
        console.error(err);
      });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    axios.post(URL, { name: evt.target[0].value });
    axios.get(URL)
      .then(res => {
        this.setState((state,props) => {
          return {todoList: res.data.data};
          });
      });
    this.componentDidMount();
  }

  clearCompleted(evt) {
    evt.preventDefault();
    const uncompleted = this.state.todoList.filter(x => x.completed===false);
    this.setState((state,props) => {
      console.log(uncompleted);
      return { todoList: uncompleted };
      })
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
       <Form 
         handleSubmit={ this.handleSubmit }
         clearCompleted={ this.clearCompleted }
       />
      </div>
    )
  }
}
