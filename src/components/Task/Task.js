import React from 'react'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'

import './Task.css'

export default class Task extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      date: new Date(),
      // eslint-disable-next-line react/destructuring-assignment
      timerLeft: localStorage.getItem(this.props.id),
    }
  }

  componentDidMount() {
    const { id } = this.props
    this.updateDate()
    this.cretatedID = setInterval(() => this.updateDate(), 45000)
    // eslint-disable-next-line react/destructuring-assignment
    const x = new Date(this.props.min * 60000 + this.props.sec * 1000).getTime()
    localStorage.setItem(id, x)
  }

  componentWillUnmount() {
    const { id } = this.props
    clearInterval(this.cretatedID)
    clearInterval(this.timerId)
    localStorage.removeItem(id)
  }

  onStart() {
    this.timerId = setInterval(() => this.updateTimer(), 1000)
  }

  onPause() {
    clearInterval(this.timerId)
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
    if (timerLeft === 0) {
      this.setState({
        timerLeft: 0,
      })
    } else {
      this.setState({
        timerLeft: timerLeft - 1000,
      })
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
    const x = new Date(+timerLeft)
    const [minutes, seconds] = [x.getMinutes(), x.getSeconds()]
    const timer = ` ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
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
