import React from 'react'

import Footer from '../Footer'
import NewTaskForm from '../NewTaskForm'

import TaskList from '../TaskList'

import './App.css'

function createToDoItem(label, min, sec) {
  return {
    label,
    min,
    sec,
    done: false,
    edited: false,
    id: Math.trunc(Math.random() * 1000),
    creationDate: new Date(),
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.createToDoItem = createToDoItem.bind(this)

    this.state = {
      toDoData: [
        this.createToDoItem('First task', 10, 0),
        this.createToDoItem('Second task', 10, 0),
        this.createToDoItem('Third task', 10, 0),
      ],

      filter: 'all',
    }
  }

  addItem = (text, min, sec) => {
    const newItem = this.createToDoItem(text, min, sec)

    this.setState(({ toDoData }) => {
      const newArray = [...toDoData, newItem]

      return { toDoData: newArray }
    })
  }

  deleteItem = (id) => {
    this.setState(({ toDoData }) => {
      const newArray = toDoData.filter((el) => el.id !== id)

      return { toDoData: newArray }
    })
  }

  onToggleDone = (id) => {
    this.setState(({ toDoData }) => {
      const idx = toDoData.findIndex((el) => el.id === id)

      const oldItem = toDoData[idx]

      const newItem = {
        ...oldItem,
        done: !oldItem.done,
      }

      const newArray = [...toDoData.slice(0, idx), newItem, ...toDoData.slice(idx + 1)]

      return { toDoData: newArray }
    })
  }

  clearCompleted = () => {
    this.setState(({ toDoData }) => {
      const newArray = toDoData.filter((el) => !el.done)

      return { toDoData: newArray }
    })
  }

  updateFilter = (status) => {
    this.setState(() => ({ filter: status }))
  }

  filterTodoTasks = () => {
    const { toDoData, filter } = this.state

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

  render() {
    const { toDoData, filter } = this.state
    const toDoCount = toDoData.filter((el) => !el.done).length

    return (
      <div>
        <NewTaskForm onItemAdded={this.addItem} />
        <section className="main">
          <TaskList
            todos={this.filterTodoTasks()}
            onDeleted={this.deleteItem}
            onToggleDone={this.onToggleDone}
          />
          <Footer
            toDo={toDoCount}
            clearCompleted={this.clearCompleted}
            updateFilter={this.updateFilter}
            selectedBtn={filter}
          />
        </section>
      </div>
    )
  }
}
