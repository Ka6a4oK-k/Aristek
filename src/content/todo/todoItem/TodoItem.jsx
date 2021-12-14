import React from 'react';
import editItemImg from './edit.svg';
import deleteItemImg from './delete.svg';
import './TodoItem.css'

export default function TodoItem(props) {
    const { id, title, completed } = props.todo;

    return (
        <li>
            <div className='todo-item__content'>
                <input className='checkbox' type="checkbox" onChange={() => {if (!props.isEditable) props.complete(id, !completed) }} checked={completed} />
                <span>{title}</span>
            </div>
            <div className='todo-item__content'>
                {!completed && <img src={editItemImg} alt="" onClick={() => {if (!props.isEditable) props.edit(id) }} />}
                <img src={deleteItemImg} alt="" onClick={() => {if (!props.isEditable) props.deleteItem(id, completed) }} />
            </div>
        </li>
    )
}
