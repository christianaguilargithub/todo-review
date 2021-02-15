import React from 'react';

const Todo = ({text,todo, todos,setTodos}) => {
    const deleteHandler = () => {
        setTodos(todos.filter((curTodo) => curTodo.id !==todo.id))
            };
    const completeHandler = () => {
        setTodos(todos.map((task) => ({
            ...task,
            completed: task.id === todo.id
              ? !task.completed
              : task.completed
          })));
             }
             console.log(todo.id)
        return(
            <div className="todo">
                <li className={`todo-item ${todo.completed ? "completed" : ""}`}>{text}</li>
                <button
                    type="button"
                    onClick={completeHandler}
                    className="complete-btn">
                    <i className="fas fa-check"/>
                </button>
                <button
                    type="submit"
                    onClick={deleteHandler}
                    className="trash-btn">
                    <i className="fas fa-trash"/>
                </button>
            </div>
        );
}
export default Todo;