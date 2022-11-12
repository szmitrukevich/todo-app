import React from 'react'
import PropTypes from 'prop-types'

import './TaskFilter.css'

const TaskFilter = ({ updateFilter, selectedBtn }) => (
  <ul className="filters">
    <li>
      <button
        type="button"
        className={selectedBtn === 'all' ? 'selected' : null}
        onClick={() => updateFilter('all')}
      >
        All
      </button>
    </li>
    <li>
      <button
        type="button"
        className={selectedBtn === 'active' ? 'selected' : null}
        onClick={() => updateFilter('active')}
      >
        Active{' '}
      </button>
    </li>
    <li>
      <button
        type="button"
        className={selectedBtn === 'completed' ? 'selected' : null}
        onClick={() => updateFilter('completed')}
      >
        Completed{' '}
      </button>
    </li>
  </ul>
)

TaskFilter.defaultProps = { updateFilter: () => null, selectedBtn: 'all' }

TaskFilter.propTypes = { updateFilter: PropTypes.func, selectedBtn: PropTypes.node }

export default TaskFilter
