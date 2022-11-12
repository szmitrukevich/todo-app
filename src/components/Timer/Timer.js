import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const Timer = ({ id, checked, min, sec }) => {
  const timerL = localStorage.getItem(id) ? localStorage.getItem(id) : new Date(min * 60000 + sec * 1000).getTime()
  const [timerLeft, setTimerLeft] = useState(timerL)
  const [started, setStarted] = useState()

  useEffect(() => {
    if (!localStorage.getItem(id)) {
      localStorage.setItem(id, new Date(min * 60000 + sec * 1000).getTime())
    }
    const interval = setInterval(() => {
      if (started) {
        setTimerLeft((time) => {
          localStorage.setItem(id, time - 1000)
          return time - 1000
        })
      }
      if (timerLeft < 500) {
        setTimerLeft(() => {
          localStorage.setItem(id, 0)
          return 0
        })
      }
    }, 1000)
    if (!started) {
      clearInterval(interval)
    }

    if (checked) {
      clearInterval(interval)
      setStarted(false)
    }
    if (timerLeft < 100) {
      clearInterval(interval)
      localStorage.setItem(id, 0)
    }

    return () => {
      clearInterval(interval)
      localStorage.setItem(id, timerLeft)
    }
  }, [checked, started, timerLeft])

  const onStart = (e) => {
    e.preventDefault()
    setStarted(true)
  }

  const onPause = (e) => {
    e.preventDefault()
    setStarted(false)
  }

  const y = new Date(+timerLeft)
  const [minutes, seconds] = [(y.getHours() - 3) * 60 + y.getMinutes(), y.getSeconds()]
  const timer = y.getTime()
    ? ` ${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    : 'Timer ran out'
  const startButton = !started ? (
    <button
      className="icon icon-play"
      type="button"
      aria-label="play button"
      onClick={onStart}
      key={id}
    />
  ) : null
  const pauseButton = started ? (
    <button
      className="icon icon-pause"
      type="button"
      aria-label="pause button"
      onClick={onPause}
      key={id + 1}
    />
  ) : null

  const buttons = y.getTime() ? [startButton, pauseButton] : null
  return (
    <span className="description">
      {buttons}
      {timer}
    </span>
  )
}
export default Timer
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
