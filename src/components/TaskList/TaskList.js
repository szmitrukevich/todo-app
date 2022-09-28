import React from "react";

import Task from "../Task";

import './TaskList.css'

const TaskList = ({ todos, onDeleted }) => {

    
    const elements = todos.map((item) => {
        const {id, ...itemProps} = item;

        return (
            <Task 
            { ...itemProps }
            key = { id }
            onDeleted = {() => onDeleted(id)}/>
        )
    })

    return <ul className="todo-list">
        { elements }
    </ul>
}



export default TaskList;