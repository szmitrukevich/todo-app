import React from "react";
import { formatDistanceToNow } from 'date-fns'

import './Task.css'

export default class Task  extends React.Component {
  
  constructor() {
    super()

    this.state = {
      completed: false
    }

    this.onToggleClick = () => {
      this.setState ((state) => {
        return {
          completed: !this.state.completed
        }
      })
    }
  }

    

  render() {

    const { label, onDeleted } = this.props
    const { completed } = this.state
    let classNames = ''

    if (completed) {
      classNames += ' completed'
    }

    return (
      <li className={classNames} >
          <div className="view">
            <input className="toggle" type="checkbox" onClick={this.onToggleClick}></input>
            <label>
              <span className="description">{label}</span>
              <span className="created">{formatDistanceToNow(new Date(), { includeSeconds : true})}</span>
            </label>
            <button className="icon icon-edit"></button>
            <button 
            className="icon icon-destroy"
            onClick={ onDeleted }></button>
          </div>
        </li>
  )
}
}


