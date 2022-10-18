import React from 'react'

import './NewTaskForm.css'
import PropTypes from 'prop-types'

export default class NewTaskForm extends React.Component {
  constructor() {
    super()

    this.state = {
      label: '',
    }
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  onSubmit = (e) => {
    const { onItemAdded } = this.props
    const { label } = this.state
    e.preventDefault()
    onItemAdded(label)
    this.setState({
      label: '',
    })
  }

  render() {
    const { label } = this.state

    return (
      <header className="header">
        <h1>todos</h1>
        <form
          className="form"
          onSubmit={this.onSubmit}
        >
          <input
            type="text"
            className="new-todo"
            onChange={this.onLabelChange}
            placeholder="What needs to be done?"
            value={label}
          />
        </form>
      </header>
    )
  }
}

NewTaskForm.defaultProps = {
  onItemAdded: () => null,
}

NewTaskForm.propTypes = {
  onItemAdded: PropTypes.func,
}
