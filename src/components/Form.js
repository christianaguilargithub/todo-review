import React from "react";

function Form({
                setStatus,
                setInputText,
                todos,
                setTodos,
                inputText
             })
            {
        const date = (new Date()).toISOString()
        const inputTextHandler = (e) => {
            setInputText(e.target.value.trim())
        };
        const submitTodoHandler = (e) => {
                e.preventDefault();
                inputText.length === 0  ?
                alert('Required Input')
                :
                setTodos([
                          ...todos,
                         {
                           id: date,
                           text: inputText,
                           completed: false,
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