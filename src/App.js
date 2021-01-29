import React, {useState, useEffect} from "react";

import Form from './components/Form';
import TodoList from "./components/TodoList";

import './App.css';

function App() {

  const[inputText, setInputText]= useState("");
  const[todos, setTodos] = useState([]);
  const [status, setStatus] = useState("all");
  const [filteredTodos, setFilteredTodos] = useState([]);
  useEffect(
    function () {
      getLocalTodos();
    }, []
  );
   useEffect(
    function () {
       function filterHandler() {
         switch (status) {
           case 'completed':
             setFilteredTodos(todos.filter(todo => todo.completed === true));
             break;
           case 'uncompleted':
             setFilteredTodos(todos.filter(todo => todo.completed === false));
             break;
           default:
             setFilteredTodos(todos);
         }
       }
       filterHandler();
     },[todos,status]);
<<<<<<< HEAD
    function getLocalTodos() {
      if (localStorage.getItem("todos") == null) {
        localStorage.setItem("todos", JSON.stringify([]));
      } else {
        let todoLocal = JSON.parse(localStorage.getItem("todos"));
        setTodos(todoLocal);
      }
    };
=======

  function getLocalTodos() {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem("todos"));
      setTodos(todoLocal);
    }
  }
>>>>>>> 9764fc1e86e71a85fae3a8d54b8b3d5cabc7f10f
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
         setStatus={setStatus} 
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
