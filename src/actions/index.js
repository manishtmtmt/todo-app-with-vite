import axios from "axios";

export const fetchTodos = async () => {
  const { data } = await axios.get("https://grumpy-hem-hen.cyclic.cloud/data");

  return data.todos;
};

export const addTodo = async (todo) => {
  const { data } = await axios.get("https://grumpy-hem-hen.cyclic.cloud/data");

  const newData = [todo, ...data.todos];

  await axios.post("https://grumpy-hem-hen.cyclic.cloud/data", {
    todos: newData,
  });
};

export const isTodoCompleted = async (id) => {
  const { data } = await axios.get("https://grumpy-hem-hen.cyclic.cloud/data");

  let completed;

  data.todos.forEach((todo) => {
    if (todo.id === id) completed = todo.isCompleted;
  });

  return completed;
};

export const markTodoCompleted = async (id) => {
  const { data } = await axios.get("https://grumpy-hem-hen.cyclic.cloud/data");

  data.todos.forEach((todo) => {
    if (todo.id === id) todo.isCompleted = !todo.isCompleted;
  });

  await axios.post("https://grumpy-hem-hen.cyclic.cloud/data", {
    todos: data.todos,
  });
};

export const deleteTodo = async (id) => {
  const { data } = await axios.get("https://grumpy-hem-hen.cyclic.cloud/data");

  const updatedData = data.todos.filter((todo) => todo.id !== id);

  await axios.post("https://grumpy-hem-hen.cyclic.cloud/data", {
    todos: updatedData,
  });
};

export const countUncompletedTodo = async () => {
  const { data } = await axios.get("https://grumpy-hem-hen.cyclic.cloud/data");

  return data.todos.filter((todo) => !todo.isCompleted).length;
};

export const clearAllCompletedTodos = async () => {
  const { data } = await axios.get("https://grumpy-hem-hen.cyclic.cloud/data");

  const updatedData = data.todos.filter((todo) => !todo.isCompleted);

  await axios.put("https://grumpy-hem-hen.cyclic.cloud/data", {
    todos: updatedData,
  });
};

export const getActiveTodos = async () => {
  const { data } = await axios.get("https://grumpy-hem-hen.cyclic.cloud/data");

  return data.todos.filter((todo) => !todo.isCompleted);
};

export const getCompletedTodos = async () => {
  const { data } = await axios.get("https://grumpy-hem-hen.cyclic.cloud/data");

  return data.todos.filter((todo) => todo.isCompleted);
};

export const updateReOrderedTodos = async (todos) => {
  await axios.put("https://grumpy-hem-hen.cyclic.cloud/data", { todos });
};
