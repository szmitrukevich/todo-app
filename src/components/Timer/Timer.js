import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const Timer = ({ id, checked, time }) => {
  const timerL = localStorage.getItem(id) ? localStorage.getItem(id) : new Date(time * 1000).getTime()
  const [timerLeft, setTimerLeft] = useState(timerL)
  const [started, setStarted] = useState(false)

  const updateTimerInfo = (int, isStarted, isChecked, timeLeft, setStart, setTimer, idx) => {
    if (!started || checked || timeLeft < 100) clearInterval(int)
    if (checked) setStart(false)
    if (timeLeft < 100) {
      setTimer(0)
      localStorage.setItem(idx, 0)
    }
  }
  useEffect(() => {
    if (!localStorage.getItem(id)) {
      localStorage.setItem(id, new Date(time * 1000).getTime())
    }
    const interval = setInterval(() => {
      if (started) {
        setTimerLeft((currTimer) => {
          localStorage.setItem(id, currTimer - 1000)
          return currTimer - 1000
        })
      }
    }, 1000)
    updateTimerInfo(interval, started, checked, timerLeft, setStarted, setTimerLeft, id)

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

  const timerData = new Date(+timerLeft)
  const [minutes, seconds] = [(timerData.getHours() - 3) * 60 + timerData.getMinutes(), timerData.getSeconds()]
  const timer = timerData.getTime()
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

  const buttons = timerData.getTime() ? [startButton, pauseButton] : null
  return (
    <span className="description">
      {buttons}
      {timer}
    </span>
  )
}
export default Timer
Timer.defaultProps = {
  time: 0,
  id: '',
  checked: false,
}

Timer.propTypes = {
  time: PropTypes.number,
  id: PropTypes.string,
  checked: PropTypes.bool,
}
