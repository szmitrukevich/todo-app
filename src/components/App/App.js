import React from 'react'

import Footer from '../Footer'
import NewTaskForm from '../NewTaskForm'

import TaskList from '../TaskList'

import './App.css'

let maxId = 100

function createToDoItem(label) {
  return {
    label,
    done: false,
    edited: false,
    id: (maxId += 1),
    creationDate: new Date(),
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.createToDoItem = createToDoItem.bind(this)

    this.state = {
      toDoData: [
        this.createToDoItem('First task'),
        this.createToDoItem('Second task'),
        this.createToDoItem('Third task'),
      ],

      filter: 'all',
    }
  }

  addItem = (text) => {
    const newItem = this.createToDoItem(text)

    this.setState(({ toDoData }) => {
      const newArray = [...toDoData, newItem]

      return {
        toDoData: newArray,
      }
    })
  }

  deleteItem = (id) => {
    this.setState(({ toDoData }) => {
      const newArray = toDoData.filter((el) => el.id !== id)

      return {
        toDoData: newArray,
      }
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

      return {
        toDoData: newArray,
      }
    })
  }

  clearCompleted = () => {
    this.setState(({ toDoData }) => {
      const newArray = toDoData.filter((el) => !el.done)

      return {
        toDoData: newArray,
      }
    })
  }

  updateFilter = (status) => {
    this.setState(() => ({
      filter: status,
    }))
  }

  filterTodoTasks = () => {
    const { toDoData, filter } = this.state

    let filteredData

    if (filter === 'all') {
      filteredData = [...toDoData]
    } else {
      filteredData = [...toDoData].filter((el) => el.done === filter)
    }

    return filteredData
  }

  render() {
    const { toDoData } = this.state
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
          />
        </section>
      </div>
    )
  }
}
