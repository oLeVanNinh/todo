import React, { Component } from 'react';
import nextId from 'react-id-generator';
import './todo.scss';

class Todos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      newTask: "",
      idPrefix: null
    }

    this.fetchTasks = this.fetchTasks.bind(this);
    this.store = this.store.bind(this);
    this.addTask = this.addTask.bind(this);
    this.updateNewTask = this.updateNewTask.bind(this);
    this.toggleTaskStatus = this.toggleTaskStatus.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
    this.generateRandomString = this.generateRandomString.bind(this)
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
    const prefix = this.state.idPrefix || this.generateRandomString(10);
    this.setState({
      list: items,
      idPrefix: prefix
    })
  }

  updateNewTask(event) {
    const newTask = event.target.value;
    this.setState({ newTask: newTask });
  }

  addTask(event) {
    event.preventDefault();
    const taskName = this.state.newTask.trim();
    if (taskName === "") {
      return
    }

    const id = nextId(this.state.idPrefix);
    const store = this.store();
    const newTask = { id: id, name: taskName, status: 0 }
    const newTasks = [newTask, ...this.state.list]
    this.setState({
      newTask: "",
      list: newTasks
    })
    store.setTasks(newTasks)
  }

  toggleTaskStatus(event) {
    const taskId = event.target.getAttribute('data-id');
    const newList = this.state.list.map(task => {
      const dupTask = task;
      if (dupTask.id === taskId) { dupTask.status = dupTask.status === 0 ? 1 : 0 }
      return dupTask;
    })
    this.setState({list: newList});
    this.store().setTasks(newList);
  }

  deleteTask(event) {
    const taskId = event.target.getAttribute('data-id');
    const newList = this.state.list.filter(task => task.id !== taskId)
    this.setState({list: newList});
    this.store().setTasks(newList);
  }

  generateRandomString(len) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = ""
    for (let i =0; i < len; i++) {
      let charIndex = Math.round(Math.random() * 62);
      result += characters[charIndex];
    }

    return result;
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
    <div className="tasks-count">{tasks_count} { tasks_count> 1 ? "tasks" : "task"}</div>
          <form className="task-form" onSubmit={this.addTask}>
            <input value={this.state.newTask} onChange={this.updateNewTask} className="task-input" placeholder="Add a new task..." />
          </form>
       </div>
        <div className="task-list">
          { tasks_count > 0 ? (
            tasks.map(task =>
              <div className="task-item" key={task.id}>
                <input type="checkbox" className="task-status" data-id={task.id} onChange={this.toggleTaskStatus} checked={task.status} />
                <div className={"task-name" + (task.status === 1 ? " done" : "")}>{task.name}</div>
                <button className="task-delete" data-id={task.id} onClick={this.deleteTask}></button>
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
