export const getLocalTodos = () => {
  const todos = localStorage.getItem("todos");
  if (todos == null) {
    localStorage.setItem("todos", JSON.stringify([]));
  } else {
    return [];
  }
}
export const TodosFilter = {
  All: 'all',
  Completed: 'completed',
  Uncompleted: 'uncompleted',
}
export default getLocalTodos;

