import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import Footer from '../Footer'
import NewTaskForm from '../NewTaskForm'

import TaskList from '../TaskList'

import './App.css'

const App = () => {
  const createToDoItem = (label, time) => ({
    label,
    time,
    done: false,
    id: uuidv4(),
    creationDate: new Date(),
  })

  const [toDoData, setData] = useState([
    createToDoItem('First task', 600),
    createToDoItem('Second task', 600),
    createToDoItem('Third task', 600),
  ])

  const [filter, setFilter] = useState('all')

  const addItem = (text, time) => {
    const newItem = createToDoItem(text, time)
    setData([...toDoData, newItem])
  }

  const deleteItem = (id) => {
    setData(toDoData.filter((el) => el.id !== id))
  }

  const onToggleDone = (id) => {
    const idx = toDoData.findIndex((el) => el.id === id)
    const oldItem = toDoData[idx]
    const newItem = {
      ...oldItem,
      done: !oldItem.done,
    }
    setData([...toDoData.slice(0, idx), newItem, ...toDoData.slice(idx + 1)])
  }

  const clearCompleted = () => {
    setData(toDoData.filter((el) => !el.done))
  }

  const updateFilter = (status) => {
    setFilter(status)
  }

  const filterTodoTasks = () => {
    let filteredData

    if (filter === 'all') {
      filteredData = [...toDoData]
    } else if (filter === 'active') {
      filteredData = [...toDoData].filter((el) => !el.done)
    } else {
      filteredData = [...toDoData].filter((el) => el.done)
    }

    return filteredData
  }

  return (
    <div>
      <NewTaskForm onItemAdded={addItem} />
      <section className="main">
        <TaskList
          todos={filterTodoTasks()}
          onDeleted={deleteItem}
          onToggleDone={onToggleDone}
        />
        <Footer
          toDo={toDoData}
          clearCompleted={clearCompleted}
          updateFilter={updateFilter}
          selectedBtn={filter}
        />
      </section>
    </div>
  )
}

export default App
