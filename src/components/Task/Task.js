import React from 'react'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'

import './Task.css'

export default class Task extends React.Component {
  constructor(props) {
    super(props)
    // eslint-disable-next-line react/destructuring-assignment
    if (!localStorage.getItem(this.props.id)) {
      // eslint-disable-next-line react/destructuring-assignment, max-len
      localStorage.setItem(this.props.id, new Date(this.props.min * 60000 + this.props.sec * 1000).getTime())
    }
    this.state = {
      date: new Date(),
      // eslint-disable-next-line react/destructuring-assignment
      timerLeft: localStorage.getItem(this.props.id),
    }
  }

  componentDidMount() {
    this.updateDate()
    this.cretatedID = setInterval(() => this.updateDate(), 45000)
  }

  componentWillUnmount() {
    clearInterval(this.cretatedID)
  }

  onStart() {
    if (!this.timerId) {
      this.timerId = setInterval(() => this.updateTimer(), 1000)
    }
  }

  onPause() {
    clearInterval(this.timerId)
    delete this.timerId
  }

  updateDate() {
    this.setState(() => {
      const { creationDate } = this.props

      return {
        date: creationDate,
      }
    })
  }

  updateTimer() {
    const { timerLeft } = this.state
    const { id } = this.props
    if (timerLeft < 1000) {
      this.setState({
        timerLeft: 0,
      })
      localStorage.setItem(id, 0)
    } else {
      this.setState({
        timerLeft: timerLeft - 1000,
      })
      localStorage.setItem(id, timerLeft - 1000)
    }
  }

  render() {
    const { label, onDeleted, onToggleDone, done, edited } = this.props
    const { date, timerLeft } = this.state
    let classNames = ''
    let checked = false
    if (done) {
      classNames += ' completed'
      checked = true
    }
    if (edited) {
      classNames += ' editing'
    }
    const y = new Date(+timerLeft)
    const [hours, minutes, seconds] = [y.getHours(), y.getMinutes(), y.getSeconds()]
    const min = (hours - 3) * 60 + minutes
    const timer = ` ${min.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
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
            <span className="title">{label}</span>
            <span className="description">
              <button
                className="icon icon-play"
                type="button"
                aria-label="play button"
                onClick={this.onStart.bind(this)}
              />
              <button
                className="icon icon-pause"
                type="button"
                aria-label="pause button"
                onClick={this.onPause.bind(this)}
              />
              {timer}
            </span>
            <span className="description">created {formatDistanceToNow(date)} ago</span>
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
