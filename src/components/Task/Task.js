import React, { useEffect, useState } from 'react'
import { formatDistance } from 'date-fns'
import PropTypes from 'prop-types'

import './Task.css'
import Timer from '../Timer'

const Task = ({ label, onDeleted, onToggleDone, done, edited, id, min, sec, creationDate }) => {
  const [currentDate, setCurrentDate] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(new Date())
    }, 5000)

    return () => clearInterval(interval)
  }, [])

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
          id={id}
        />
        <label htmlFor={id}>
          <span className="title">{label}</span>
          <Timer
            id={id}
            min={min}
            sec={sec}
            checked={checked}
          />
          <span className="description">
            created {formatDistance(currentDate, creationDate, { includeSeconds: true })} ago
          </span>
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

export default Task

Task.defaultProps = {
  creationDate: new Date(),
  label: 'Active task',
  onDeleted: () => null,
  onToggleDone: () => null,
  done: false,
  edited: false,
  min: 0,
  sec: 0,
  id: 1,
}

Task.propTypes = {
  creationDate: PropTypes.instanceOf(Date),
  label: PropTypes.string,
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
  done: PropTypes.bool,
  edited: PropTypes.bool,
  min: PropTypes.number,
  sec: PropTypes.number,
  id: PropTypes.number,
}
