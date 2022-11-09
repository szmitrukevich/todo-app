import React from 'react'
import PropTypes from 'prop-types'

export default class Timer extends React.Component {
  constructor(props) {
    super(props)

    // eslint-disable-next-line react/destructuring-assignment
    if (!localStorage.getItem(this.props.id)) {
      // eslint-disable-next-line react/destructuring-assignment, max-len
      localStorage.setItem(this.props.id, new Date(this.props.min * 60000 + this.props.sec * 1000).getTime())
    }

    this.state = {
      // eslint-disable-next-line react/destructuring-assignment
      timerLeft: localStorage.getItem(this.props.id),
    }
  }

  componentDidUpdate(prevProps) {
    const { checked } = this.props
    if (checked !== prevProps.checked) {
      clearInterval(this.timerId)
      delete this.timerId
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
    delete this.timerId
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

  updateTimer() {
    const { timerLeft } = this.state
    const { id } = this.props
    if (timerLeft < 100) {
      this.setState({ timerLeft: 0 })
      localStorage.setItem(id, 0)
      clearInterval(this.timerId)
    } else {
      this.setState({ timerLeft: timerLeft - 1000 })
      localStorage.setItem(id, timerLeft - 1000)
    }
  }

  render() {
    const { timerLeft } = this.state
    const { checked } = this.props
    const y = new Date(+timerLeft)
    const [hours, minutes, seconds] = [y.getHours(), y.getMinutes(), y.getSeconds()]
    const min = (hours - 3) * 60 + minutes
    const timer = timerLeft
      ? ` ${min.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
      : 'Timer ran out'
    const buttons = timerLeft ? (
      <>
        <button
          className="icon icon-play"
          type="button"
          aria-label="play button"
          onClick={!checked ? this.onStart.bind(this) : null}
        />
        <button
          className="icon icon-pause"
          type="button"
          aria-label="pause button"
          onClick={this.onPause.bind(this)}
        />
      </>
    ) : null

    return (
      <span className="description">
        {buttons}
        {timer}
      </span>
    )
  }
}
Timer.defaultProps = {
  min: 0,
  sec: 0,
  id: 1,
  checked: false,
}

Timer.propTypes = {
  min: PropTypes.number,
  sec: PropTypes.number,
  id: PropTypes.number,
  checked: PropTypes.bool,
}
