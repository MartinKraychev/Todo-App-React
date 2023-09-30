import { Spinner } from "./Spinner"
import { useState, useEffect } from 'react'
import { Todo } from './Todo'

export const Main = (props) => {
    const [todos, SetTodos] = useState([])

    useEffect(() => {
        fetch("http://localhost:3030/jsonstore/todos")
            .then(res => res.json())
            .then(data => SetTodos(Object.values(data)))
    }, [])

    const clickHandler = (todo) => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ isCompleted: !todo.isCompleted })
        }

        fetch(`http://localhost:3030/jsonstore/todos/${todo._id}`, requestOptions)
            .then(res => res.json())
            .then(modifiedTodo => {
                SetTodos(oldTodos => oldTodos.map(oldTodo => oldTodo._id == modifiedTodo._id ? modifiedTodo : oldTodo))
            })
    }

    const addNewTodoHandler = (e) => {
        let parent = e.nativeEvent.target.parentNode
        let input_value = parent.querySelector('input')
        
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: input_value.value, isCompleted: false})
        }
        fetch(`http://localhost:3030/jsonstore/todos/`, requestOptions)
            .then(res => res.json())
            .then(newTodo => {
                const todoListCopy = [...todos]
                todoListCopy.push(newTodo)
                SetTodos(todoListCopy);
            })

        input_value.value = ""
    }

    const deleteHandler = (id) => {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        }

        fetch(`http://localhost:3030/jsonstore/todos/${id}`, requestOptions)

        const newTodoList = todos.filter(todo => todo._id !== id)
        SetTodos(newTodoList)
    }

    return (
        <main className="main">

            <section className="todo-list-container">
                <h1>{props.title}</h1>

                <div className="add-btn-container">
                    <input className="input" placeholder="Create new ToDo item"/>
                    <button className="btn" onClick={addNewTodoHandler}>{props.buttonText}</button>
                </div>

                <div className="table-wrapper">

                    <div>
                        {todos.length == 0 && <Spinner spinnerText="loading..." />}
                        <table className="table">
                            <thead>
                                <tr>
                                    <th className="table-header-task">Task</th>
                                    <th className="table-header-status">Status</th>
                                    <th className="table-header-action">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {todos.map(todo => <Todo key={todo._id} clickHandler={clickHandler} deleteHandler={deleteHandler} {...todo} />)}
                            </tbody>
                        </table>
                    </div>

                </div>
            </section>
        </main>
    )
}