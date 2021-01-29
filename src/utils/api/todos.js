export const getLocalTodos = () => {
  const todos = localStorage.getItem("todos");
  if (todos == null) {
    localStorage.setItem("todos", JSON.stringify([]));
  } else {
    return [];
  }
}
export default getLocalTodos;
