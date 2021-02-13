import React, {useState, useEffect} from "react";

import Form from './components/Form';
import TodoList from "./components/TodoList";
import getLocalTodos from "./utils/api/todos";
import TodosFilter from "./utils/api/todos";


import './App.css';

function App() {
  const[inputText, setInputText]= useState("");
  const[error, setError]= useState();
  const[todos, setTodos] = useState([]);
  const [filter, setFilter] = useState(TodosFilter.All)
  const [filteredTodos, setFilteredTodos] = useState([]);
  useEffect(()=>{
    const todos = getLocalTodos();
    setTodos(todos);
  }, []);
   useEffect(
       function filterHandler() {
         switch (filter) {
           case 'completed':
             setFilteredTodos(todos.filter(todo => todo.completed));
             break;
           case 'uncompleted':
             setFilteredTodos(todos.filter(todo => todo.completed === false));
             break;
           default:
             setFilteredTodos(todos);
         }
       },[todos,filter]);
  return (
    <div className="App">
      <header>
        <h1>To Do List </h1>
      </header>
      <Form
         inputText={inputText}
         todos={todos}
         setTodos={setTodos}
         setInputText={setInputText}
         setStatus={setFilter}
         setError={setError}
         error={error}
      />
      <TodoList
          filteredTodos={filteredTodos}
          setTodos={setTodos}
          todos={todos}
      />
    </div>
  );
}

export default App;
