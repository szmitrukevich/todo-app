import React from 'react'
import PropTypes from 'prop-types'

import TaskFilter from '../TasksFilter'
import './Footer.css'

const Footer = ({ clearCompleted, updateFilter, toDo }) => (
  <footer className="footer">
    <span className="todo-count">{toDo} items left</span>
    <TaskFilter updateFilter={updateFilter} />
    <button
      type="button"
      onClick={clearCompleted}
      className="clear-completed"
    >
      Clear completed
    </button>
  </footer>
)

Footer.defaultProps = {
  clearCompleted: () => null,
  updateFilter: () => null,
  toDo: null,
}

Footer.propTypes = {
  clearCompleted: PropTypes.func,
  updateFilter: PropTypes.func,
  toDo: PropTypes.number,
}

export default Footer
