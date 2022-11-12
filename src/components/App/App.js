import React, { useState } from 'react'

import Footer from '../Footer'
import NewTaskForm from '../NewTaskForm'

import TaskList from '../TaskList'

import './App.css'

const App = () => {
  const createToDoItem = (label, min, sec) => ({
    label,
    min,
    sec,
    done: false,
    edited: false,
    id: Math.trunc(Math.random() * 1000),
    creationDate: new Date(),
  })

  const [toDoData, setData] = useState([
    createToDoItem('First task', 10, 0),
    createToDoItem('Second task', 10, 0),
    createToDoItem('Third task', 10, 0),
  ])

  const [filter, setFilter] = useState('all')

  const addItem = (text, min, sec) => {
    const newItem = createToDoItem(text, min, sec)

    setData((prevtoDoData) => {
      const newArray = [...prevtoDoData, newItem]

      return newArray
    })
  }

  const deleteItem = (id) => {
    setData((prevtoDoData) => {
      const newArray = prevtoDoData.filter((el) => el.id !== id)

      return newArray
    })
  }

  const onToggleDone = (id) => {
    setData((prevtoDoData) => {
      const idx = prevtoDoData.findIndex((el) => el.id === id)

      const oldItem = prevtoDoData[idx]

      const newItem = {
        ...oldItem,
        done: !oldItem.done,
      }

      const newArray = [...prevtoDoData.slice(0, idx), newItem, ...prevtoDoData.slice(idx + 1)]

      return newArray
    })
  }

  const clearCompleted = () => {
    setData((prevtoDoData) => {
      const newArray = prevtoDoData.filter((el) => !el.done)

      return newArray
    })
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
  const toDoCount = toDoData.filter((el) => !el.done).length

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
          toDo={toDoCount}
          clearCompleted={clearCompleted}
          updateFilter={updateFilter}
          selectedBtn={filter}
        />
      </section>
    </div>
  )
}

export default App
