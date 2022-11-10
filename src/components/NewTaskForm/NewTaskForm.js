import React from 'react'

import './NewTaskForm.css'
import PropTypes from 'prop-types'

export default class NewTaskForm extends React.Component {
  constructor() {
    super()

    this.state = {
      label: '',
      min: '',
      sec: '',
      error: false,
    }
  }

  onChange = (e, field) => {
    this.setState({ [field]: e.target.value })
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { onItemAdded } = this.props
    const { label, min, sec } = this.state
    if (Number.isNaN(+min) || Number.isNaN(+sec) || +sec > 59 || +sec < 0 || +min < 0) {
      this.setState({ error: true })
    } else {
      onItemAdded(label, +min, +sec)
      this.setState({
        label: '',
        min: '',
        sec: '',
        error: false,
      })
    }
  }

  render() {
    const { label, min, sec, error } = this.state
    const warning = error ? <div className="warning">Enter a valid timer value</div> : null
    return (
      <header className="header">
        <h1>todos</h1>
        <form
          className="new-todo-form"
          onSubmit={this.onSubmit}
        >
          <input
            type="submit"
            className="new-todo-form_submit"
          />
          <input
            type="text"
            className="new-todo"
            onChange={(e) => this.onChange(e, 'label')}
            placeholder="Task"
            required
            value={label}
          />
          <input
            type="text"
            className="new-todo-form__timer"
            onChange={(e) => this.onChange(e, 'min')}
            placeholder="Min"
            value={min}
            required
            maxLength="3"
          />
          <input
            type="text"
            className="new-todo-form__timer"
            onChange={(e) => this.onChange(e, 'sec')}
            placeholder="Sec"
            value={sec}
            required
            maxLength="2"
          />
          {warning}
        </form>
      </header>
    )
  }
}

NewTaskForm.defaultProps = { onItemAdded: () => null }

NewTaskForm.propTypes = { onItemAdded: PropTypes.func }
