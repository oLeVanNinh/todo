import React, { Component } from 'react';
import nextId from 'react-id-generator';
import './todo.scss';

class Todos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [{id: 1, name: "Just for test", status: 1}],
      newTask: ""
    }

    this.fetchTasks = this.fetchTasks.bind(this);
    this.store = this.store.bind(this);
    this.addTask = this.addTask.bind(this);
    this.updateNewTask = this.updateNewTask.bind(this);
  }

  store() {
    const store = localStorage;
    const key = (new Date()).toDateString();
    const getTasks = () => {
      return JSON.parse(store.getItem(key));
    }

    const setTasks = (items) => {
      return store.setItem(key, JSON.stringify(items));
    }

    return {
      getTasks: getTasks,
      setTasks: setTasks
    }
  }

  fetchTasks() {
    const store = this.store();
    const items = store.getTasks() || [];
    this.setState({
      list: items
    })
  }

  updateNewTask(event) {
    const newTask = event.target.value;
    console.log(this.store);
    this.setState({ newTask: newTask });
  }

  addTask(event) {
    const taskName = this.state.newTask;
    if (taskName === "") {
      return
    }

    const id = nextId();
    const newTask = { id: id, name: taskName, status: 0 }
    this.setState({
      newTask: "",
      list: [newTask, ...this.state.list]
    })
    event.preventDefault();
  }

  componentDidMount() {
    this.fetchTasks();
  }

  render() {
    const tasks = this.state.list;
    const tasks_count = tasks.length;
    const date = (new Date()).toDateString();
    return (
      <div className="todos">
        <div className="task-header">
           <h1 className="times">{date}</h1>
           <div className="tasks-count">{tasks_count > 1 ? `${tasks_count} tasks` : `${tasks_count} task`}</div>
          <form className="task-form" onSubmit={this.addTask}>
            <input value={this.state.newTask} onChange={this.updateNewTask} className="task-input" placeholder="Add a new task..." />
          </form>
       </div>
        <div className="task-list">
          { tasks_count > 0 ? (
            tasks.map(task =>
              <div className="task-item" key={task.id}>
                <input type="checkbox" className="task-status" data-id={task.id} />
                <div className="task-name">{task.name}</div>
                <button className="task-delete"></button>
              </div>
              )
            ) : (
            <div className="task-empty"> Not found  a tasks </div>
          )}
        </div>
      </div>
    )
  }
}

export default Todos;
