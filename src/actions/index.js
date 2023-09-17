import axios from "axios";

export const fetchTodos = async () => {
  const { data } = await axios.get("http://localhost:3001/data");

  return data.todos;
};

export const addTodo = async (todo) => {
  const { data } = await axios.get("http://localhost:3001/data");

  const newData = [todo, ...data.todos];

  await axios.post("http://localhost:3001/data", { todos: newData });
};

export const isTodoCompleted = async (id) => {
  const { data } = await axios.get("http://localhost:3001/data");

  let completed;

  data.todos.forEach((todo) => {
    if (todo.id === id) completed = todo.isCompleted;
  });

  return completed;
};

export const markTodoCompleted = async (id) => {
  const { data } = await axios.get("http://localhost:3001/data");

  data.todos.forEach((todo) => {
    if (todo.id === id) todo.isCompleted = !todo.isCompleted;
  });

  await axios.post("http://localhost:3001/data", { todos: data.todos });
};

export const deleteTodo = async (id) => {
  const { data } = await axios.get("http://localhost:3001/data");

  const updatedData = data.todos.filter((todo) => todo.id !== id);

  await axios.post("http://localhost:3001/data", { todos: updatedData });
};

export const countUncompletedTodo = async () => {
  const { data } = await axios.get("http://localhost:3001/data");

  return data.todos.filter((todo) => !todo.isCompleted).length;
};

export const clearAllCompletedTodos = async () => {
  const { data } = await axios.get("http://localhost:3001/data");

  const updatedData = data.todos.filter((todo) => !todo.isCompleted);

  await axios.put("http://localhost:3001/data", { todos: updatedData });
};
