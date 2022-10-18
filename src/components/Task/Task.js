import React from 'react'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'

import './Task.css'

export default class Task extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      date: new Date(),
    }
  }

  componentDidMount() {
    this.updateDate()

    this.timerID = setInterval(() => this.updateDate(), 45000)
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  updateDate() {
    this.setState(() => {
      const { creationDate } = this.props

      return {
        date: creationDate,
      }
    })
  }

  render() {
    const { label, onDeleted, onToggleDone, done, edited } = this.props

    const { date } = this.state

    let classNames = ''
    let checked = false

    if (done) {
      classNames += ' completed'
      checked = true
    }

    if (edited) {
      classNames += ' editing'
    }

    return (
      <li className={classNames}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            onClick={onToggleDone}
            defaultChecked={checked}
            id="toggle"
          />
          <label htmlFor="toggle">
            <span className="description">{label}</span>
            <span className="created">created {formatDistanceToNow(date)} ago</span>
          </label>
          <button
            className="icon icon-edit"
            type="button"
            aria-label="edit button"
          />
          <button
            className="icon icon-destroy"
            onClick={onDeleted}
            type="button"
            aria-label="delete button"
          />
        </div>
      </li>
    )
  }
}

Task.defaultProps = {
  creationDate: new Date(),
  label: 'Active task',
  onDeleted: () => null,
  onToggleDone: () => null,
  done: false,
  edited: false,
}

Task.propTypes = {
  creationDate: PropTypes.instanceOf(Date),
  label: PropTypes.string,
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  done: PropTypes.bool,
  edited: PropTypes.bool,
}
