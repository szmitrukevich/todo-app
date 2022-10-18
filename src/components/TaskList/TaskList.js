import React from 'react'
import PropTypes from 'prop-types'

import Task from '../Task'

import './TaskList.css'

const TaskList = ({ todos, onDeleted, onToggleDone }) => {
  const elements = todos.map((item) => {
    const { id, ...itemProps } = item

    return (
      <Task
        /* eslint-disable react/jsx-props-no-spreading */
        {...itemProps}
        key={id}
        onDeleted={() => onDeleted(id)}
        onToggleDone={() => onToggleDone(id)}
      />
    )
  })

  return <ul className="todo-list">{elements}</ul>
}

TaskList.defaultProps = {
  todos: [],
  onDeleted: () => null,
  onToggleDone: () => null,
}

TaskList.propTypes = {
  todos: PropTypes.arrayOf(PropTypes.shape),
  onDeleted: PropTypes.func,
  onToggleDone: PropTypes.func,
}

export default TaskList
