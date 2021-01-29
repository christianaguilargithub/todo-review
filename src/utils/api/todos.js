import Todo, { setTodos } from ".../component/Todo.js";
export const getLocalTodos = () => {
  const todos = localStorage.getItem("todos");
  if (todos == null) {
    localStorage.setItem("todos", JSON.stringify([]));
  } else {
    setTodos(JSON.parse(todos));
  }
}
export default getLocalTodos;
