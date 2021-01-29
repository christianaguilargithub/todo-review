import React from "react";

<<<<<<< HEAD
function Form({
                setStatus,
                setInputText,
                todos,
                setTodos,
                inputText
             })
            {
=======
function Form({ 
                setStatus, 
                setInputText, 
                todos, 
                setTodos, 
                inputText
             }) 
            {   
>>>>>>> 9764fc1e86e71a85fae3a8d54b8b3d5cabc7f10f
        const inputTextHandler = (e) => {
                setInputText(e.target.value);
             };
        const submitTodoHandler = (e) => {
                e.preventDefault();
                setTodos([
<<<<<<< HEAD
                          ...todos,
                         {
                           text: inputText,
                           completed: false,
                           id: Math.random()
=======
                          ...todos, 
                         {  
                           text: inputText, 
                           completed: false, 
                           id: Math.random() 
>>>>>>> 9764fc1e86e71a85fae3a8d54b8b3d5cabc7f10f
                         }
                    ]);
                setInputText("");
            }
        const statusHandler = (e) =>{
            setStatus(e.target.value);
     }
    return (
        <form>
            <input
                value={inputText}
                onChange={inputTextHandler}
                type="text"
                className="todo-input"
            />
            <button
                onClick={submitTodoHandler}
                className="todo-button"
                type="submit">
                <i className="fas fa-plus-square"/>
            </button>
            <div className="select">
                <select
                    onChange={statusHandler}
                    name="todos"
                    className="filter-todo">
                        <option value="all">All</option>
                        <option value="completed">Completed</option>
                        <option value="uncompleted">Uncompleted</option>
                </select>
            </div>
        </form>
    );
}
export default Form;