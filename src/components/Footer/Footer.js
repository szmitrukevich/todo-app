import React from 'react'
import PropTypes from 'prop-types'

import TaskFilter from '../TasksFilter'
import './Footer.css'

const Footer = ({ clearCompleted, updateFilter, toDo, selectedBtn }) => {
  const toDoCount = toDo.filter((el) => !el.done).length
  return (
    <footer className="footer">
      <span className="todo-count">{toDoCount} items left</span>
      <TaskFilter
        updateFilter={updateFilter}
        selectedBtn={selectedBtn}
      />
      <button
        type="button"
        onClick={clearCompleted}
        className="clear-completed"
      >
        Clear completed
      </button>
    </footer>
  )
}
Footer.defaultProps = {
  clearCompleted: () => null,
  updateFilter: () => null,
  toDo: [],
  selectedBtn: 'all',
}

Footer.propTypes = {
  clearCompleted: PropTypes.func,
  updateFilter: PropTypes.func,
  toDo: PropTypes.arrayOf(PropTypes.shape()),
  selectedBtn: PropTypes.node,
}

export default Footer
