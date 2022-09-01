import TodoItem from './todoItem/TodoItem';
import {memo} from 'react'

const TodoList = (props) => {
    return (
        <div>
            {props.todos.map(todo =>
                <TodoItem todo={todo}
                    key={todo.id}
                    complete={props.complete}
                    deleteItem={props.deleteItem}
                    edit={props.edit}
                    isEditable={props.isEditable} />
            )}
        </div>
    )
}

export default memo(TodoList);