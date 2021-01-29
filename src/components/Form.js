import React from "react";
import ShortUniqueId from 'https://cdn.jsdelivr.net/npm/short-unique-id@latest/short_uuid/mod.ts';

function Form({
                setStatus,
                setInputText,
                todos,
                setTodos,
                inputText
             })
            {
        const inputTextHandler = (e) => {
                setInputText(e.target.value);
             };
        const submitTodoHandler = (e) => {
                e.preventDefault();
                setTodos([
                          ...todos,
                         {
                           id: ShortUniqueId,
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