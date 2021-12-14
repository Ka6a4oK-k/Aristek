import React, { useEffect, useState, useRef } from 'react';
import TodoList from './todo/TodoList';
import axios from 'axios';
import { todoURL } from '../config/base.json';
import './Content.css'

export default function Content() {
    const [todos, setTodos] = useState([]);
    const [completedTodos, setCompletedTodos] = useState([])
    const [isEditable, setIsEditable] = useState(false)
    const [editable, setEditable] = useState({})

    const inputEl = useRef(null);

    useEffect(() => {
        (async () => {
            const todosResponse = await axios.get(`${todoURL}?userId=1`)
            const notCompleted = todosResponse.data.filter(todo => !todo.completed)
            const completed = todosResponse.data.filter(todo => todo.completed)
            setTodos(notCompleted);
            setCompletedTodos(completed)
        })()
    }, [])

    const complete = async (id, completed) => {
        await axios.patch(`${todoURL}/${id}`, { completed })
        const list = completed ? todos : completedTodos;
        const changedIndex = list.findIndex(todo => todo.id === id)
        const changedTodo = list[changedIndex];
        const newArr = [...list];
        newArr.splice(changedIndex, 1);
        const newTodos = completed ? newArr : [...todos, { ...changedTodo, completed }]
        const newCompleted = completed ? [...completedTodos, { ...changedTodo, completed }] : newArr;
        setTodos(newTodos)
        setCompletedTodos(newCompleted)

        // if (completed) {
        //     const changedIndex = todos.findIndex(todo => todo.id === id)
        //     const changedTodo = todos[changedIndex]; 
        //     const newArr = [...todos];
        //     newArr.splice(changedIndex, 1);
        //     setTodos(newArr)
        //     setCompletedTodos([...completedTodos, {...changedTodo, completed}])
        // } else {
        //     const changedIndex = completedTodos.findIndex(todo => todo.id === id)
        //     const changedTodo = completedTodos[changedIndex]; 
        //     const newArr = [...completedTodos];
        //     newArr.splice(changedIndex, 1);
        //     setCompletedTodos(newArr)
        //     setTodos([...todos, {...changedTodo, completed}])
        // }
    }

    const deleteItem = async (id, completed) => {
        await axios.delete(`${todoURL}/${id}`, { completed })
        if (completed) {
            const deletedIndex = completedTodos.findIndex(todo => todo.id === id)
            const newArr = [...completedTodos];
            newArr.splice(deletedIndex, 1);
            setCompletedTodos([...newArr])
        } else {
            const deletedIndex = todos.findIndex(todo => todo.id === id)
            const newArr = [...todos];
            newArr.splice(deletedIndex, 1);
            setTodos([...newArr])
        }
    }

    const add = async () => {
        if (document.getElementById('input').value !== '') {
            const addedItem = await axios.post(`${todoURL}`, { title: `${document.getElementById('input').value}`, completed: false, userId: 1 })
            setTodos([...todos, addedItem.data])
            document.getElementById('input').value = '';
        }
    }


    const edit = async (id) => {
        const edited = todos.find(item => item.id === id)
        inputEl.current.value = edited.title;
        inputEl.current.focus()
        setIsEditable(true)
        setEditable(edited);
        //await axios.patch(`${todoURL}/${id}`)
    }

    const saveEdited = async () => {
        if (inputEl.current.value !== '') {
            const todosCopy = [...todos];
            const editableIndex = todosCopy.findIndex(todo => todo.id === editable.id)
            todosCopy[editableIndex].title = inputEl.current.value;
            setTodos([...todosCopy])
            inputEl.current.value = '';
            setIsEditable(false)
        }
    }

    return (
        <div className='content-wrapper'>
            <div className='content-wrapper__todo'>
                <div className='content-wrapper__input-wrapper'>
                    <input className='input-wrapper__input' type="text" onBlur={() => {if(isEditable){inputEl.current.focus()}}} ref={inputEl} id="input" placeholder='+ Add a task, press Enter to save' />
                    {isEditable
                        ? <button className='input-wrapper__button' onClick={saveEdited}>Save</button>
                        : <button className='input-wrapper__button' onClick={add}>Add</button>
                    }
                </div>
                <div>
                    <span className='list-counter'>To do ({todos.length})</span>
                    <TodoList todos={todos} complete={complete} deleteItem={deleteItem} edit={edit} isEditable={isEditable} />
                </div>
            </div>
            <div className='content-wrapper__completed'>
                <span className='list-counter'>Completed ({completedTodos.length})</span>
                <div className='completed-list'><TodoList todos={completedTodos} complete={complete} deleteItem={deleteItem} /></div>
            </div>
        </div>
    )
}