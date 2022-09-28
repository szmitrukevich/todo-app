import React from "react";

import Footer from "../Footer";
import NewTaskForm from "../NewTaskForm";

import TaskList from "../TaskList";

import './App.css'



export default class  App extends React.Component {

    constructor () {
        super()

        this.state = {
            toDoData : [
            {label: 'Completed task', id: 1},
            {label: 'Editing task', id: 2},
            {label: 'Active task', id: 3}
        ]
        }   
    }

    deleteItem = (id) => {
        this.setState ( ({toDoData}) => {
            const newArray = toDoData.filter((el) => el.id !== id)
            
            return {
                toDoData: newArray
            }

        } )
    }
     
    render () {
        return (
            <div>
                <NewTaskForm />
                <section className="main">
                    <TaskList 
                    todos={this.state.toDoData}
                    onDeleted = { this.deleteItem}/>
                    <Footer />
                </section>
            </div>
        )
    }
    
}



