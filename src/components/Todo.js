import React from 'react';

const Todo = ({text,todo, todos,setTodos}) => {
    const deleteHandler = () => {
        setTodos(todos.filter((curTodo) => curTodo.id !==todo.id))
            };
    const completeHandler = () => {
        setTodos(todos.map(task =>{
            if(task.id === todo.id){
                     return{
<<<<<<< HEAD
                            ...task,
                            completed: !task.completed
                           }
                    }
                    return task;
=======
                            ...item,
                            completed: !item.completed 
                           }
                    } 
                    return item;
>>>>>>> 9764fc1e86e71a85fae3a8d54b8b3d5cabc7f10f
                }));
             }
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