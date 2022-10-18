import React from 'react'
import PropTypes from 'prop-types'

import './TaskFilter.css'

const TaskFilter = ({ updateFilter }) => {
  const classNames = 'selected'

  return (
    <ul className="filters">
      <li>
        <button
          type="button"
          className={classNames}
          onClick={() => updateFilter('all')}
        >
          All
        </button>
      </li>
      <li>
        <button
          type="button"
          onClick={() => updateFilter(false)}
        >
          Active{' '}
        </button>
      </li>
      <li>
        <button
          type="button"
          onClick={() => updateFilter(true)}
        >
          Completed{' '}
        </button>
      </li>
    </ul>
  )
}

TaskFilter.defaultProps = {
  updateFilter: () => null,
}

TaskFilter.propTypes = {
  updateFilter: PropTypes.func,
}

export default TaskFilter
