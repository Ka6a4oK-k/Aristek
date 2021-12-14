import TodoItem from './todoItem/TodoItem';

export default function TodoList(props) {

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