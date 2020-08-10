import React, { Component } from 'react';
import './todo.scss';

class Todos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: [{name: "Just for test", status: 1}],
    }
  }

  render() {
    const tasks = this.state.list;
    return (
      <div className="todos">
        <div className="task-header">
          <h1 className="times">Mon Aug 10 2020</h1>
          <div className="tasks-count">3 tasks</div>
          <form className="task-form">
            <input className="task-input" placeholder="Add a new task..." />
          </form>
        </div>
        <div className="task-list">
          { tasks.length > 0 ? (
            tasks.map(task =>
              <div className="task-item">
                <input type="checkbox" className="task-status" />
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
