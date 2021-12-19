import React, { useEffect, useState, useRef, useCallback, useContext } from 'react';
import TodoList from './todo/TodoList';
import axios from 'axios';
import { todoURL } from '../config/base.json';
import UserContext from '../contexts/UserContext';
import './Content.css'

export default function Content() {
    const [todos, setTodos] = useState([]);
    const [completedTodos, setCompletedTodos] = useState([])
    const [isEditable, setIsEditable] = useState(false)
    const [editable, setEditable] = useState({})

    const { currUserId } = useContext(UserContext);

    const inputEl = useRef(null);

    useEffect(() => {
        (async () => {
            const todosResponse = await axios.get(`${todoURL}?userId=${currUserId}`)
            const notCompleted = todosResponse.data.filter(todo => !todo.completed)
            const completed = todosResponse.data.filter(todo => todo.completed)
            setTodos(notCompleted);
            setCompletedTodos(completed)
        })()
    }, [currUserId])

    const complete = useCallback (async (id, completed) => {
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
    }, [todos, completedTodos])

    const deleteItem = useCallback (async (id, completed) => {
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
    }, [todos, completedTodos])

    const add = useCallback (async () => {
        if (inputEl.current.value !== '') {
            const addedItem = await axios.post(`${todoURL}`, { title: `${inputEl.current.value}`, completed: false, userId: 1 })
            setTodos([...todos, addedItem.data])
            inputEl.current.value = '';
        }
    }, [todos])


    const edit = useCallback (async (id) => {
        const edited = todos.find(item => item.id === id)
        inputEl.current.value = edited.title;
        inputEl.current.focus()
        setIsEditable(true)
        setEditable(edited);
    }, [todos])

    const saveEdited = useCallback( async () => {
        const inputValue = inputEl.current.value;
        if (inputValue !== '') {
            const todosCopy = [...todos];
            const editableIndex = todosCopy.findIndex(todo => todo.id === editable.id)
            todosCopy[editableIndex].title = inputValue;
            setTodos([...todosCopy])
            await axios.patch(`${todoURL}/${editable.id}`, {title: inputValue})
            inputEl.current.value = '';
            setIsEditable(false)
        }
    }, [todos, editable])

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