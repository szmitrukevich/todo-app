import React, { useState } from 'react'

import './NewTaskForm.css'
import PropTypes from 'prop-types'

const NewTaskForm = ({ onItemAdded }) => {
  // this.state = {
  //   label: '',
  //   min: '',
  //   sec: '',
  //   error: false,
  // }
  const [data, setData] = useState({
    error: false,
    label: '',
    min: '',
    sec: '',
  })

  const onChange = (e, field) => {
    const { value } = e.target
    setData((prevData) => ({
      ...prevData,
      [field]: value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const { label, min, sec } = data
    if (Number.isNaN(+min) || Number.isNaN(+sec) || +sec > 59 || +sec < 0 || +min < 0) {
      setData((prevData) => ({
        ...prevData,
        error: true,
      }))
    } else {
      onItemAdded(label, +min, +sec)
      setData({
        label: '',
        min: '',
        sec: '',
        error: false,
      })
    }
  }
  const warning = data.error ? <div className="warning">Enter a valid timer value</div> : null
  return (
    <header className="header">
      <h1>todos</h1>
      <form
        className="new-todo-form"
        onSubmit={onSubmit}
      >
        <input
          type="submit"
          className="new-todo-form_submit"
        />
        <input
          type="text"
          className="new-todo"
          onChange={(e) => onChange(e, 'label')}
          placeholder="Task"
          required
          value={data.label}
        />
        <input
          type="text"
          className="new-todo-form__timer"
          onChange={(e) => onChange(e, 'min')}
          placeholder="Min"
          value={data.min}
          required
          maxLength="3"
        />
        <input
          type="text"
          className="new-todo-form__timer"
          onChange={(e) => onChange(e, 'sec')}
          placeholder="Sec"
          value={data.sec}
          required
          maxLength="2"
        />
        {warning}
      </form>
    </header>
  )
}

export default NewTaskForm

NewTaskForm.defaultProps = { onItemAdded: () => null }

NewTaskForm.propTypes = { onItemAdded: PropTypes.func }
