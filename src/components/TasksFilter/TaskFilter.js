import React from 'react'
import PropTypes from 'prop-types'

import './TaskFilter.css'

const TaskFilter = ({ updateFilter, selectedBtn }) => {
  const filterData = {
    all: 'All',
    active: 'Active',
    completed: 'Completed',
  }
  const filterList = Object.entries(filterData).map((item) => (
    <li key={item[0]}>
      <button
        type="button"
        className={selectedBtn === item[0] ? 'selected' : null}
        onClick={() => updateFilter(item[0])}
      >
        {item[1]}
      </button>
    </li>
  ))
  return <ul className="filters">{filterList}</ul>
}
TaskFilter.defaultProps = { updateFilter: () => null, selectedBtn: 'all' }

TaskFilter.propTypes = { updateFilter: PropTypes.func, selectedBtn: PropTypes.node }

export default TaskFilter
