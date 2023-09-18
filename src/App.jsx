/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Box, useColorMode } from "@chakra-ui/react";
import { v4 } from "uuid";

import lightBackgroundImage from "./assets/bg-desktop-light.jpg";
import darkBackgroundImage from "./assets/bg-desktop-dark.jpg";
import Header from "./components/Header";
import InputButton from "./components/InputButton";
import {
  addTodo,
  clearAllCompletedTodos,
  countUncompletedTodo,
  deleteTodo,
  fetchTodos,
  getActiveTodos,
  getCompletedTodos,
  markTodoCompleted,
} from "./actions";
import TodoList from "./components/TodoList";
import { StatusBar } from "./components/StatusBar";

function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [itemLeft, setItemLeft] = useState(0);

  const handleAddTodo = async (e) => {
    if (todo && e.keyCode === 13) {
      const newTodo = {
        id: v4(),
        title: todo,
        isCompleted: false,
      };

      await addTodo(newTodo);
      setTodos(await fetchTodos());
      setTodo("");
    }
  };

  const handleCompletedTodo = async (id) => {
    await markTodoCompleted(id);
    countUncompletedTodo().then((count) => setItemLeft(count));
  };

  const handleDeleteTodo = async (id) => {
    await deleteTodo(id);
    setTodos(await fetchTodos());
  };

  const handleClearAllClick = async () => {
    await clearAllCompletedTodos();
    fetchTodos().then((data) => setTodos(data));
  };

  const handleAllClick = async () => {
    fetchTodos().then((data) => setTodos(data));
  };

  const handleActiveClick = async () => {
    getActiveTodos().then((todos) => setTodos(todos));
  };

  const handleCompletedClick = async () => {
    getCompletedTodos().then((todos) => setTodos(todos));
  };

  useEffect(() => {
    fetchTodos().then((data) => setTodos(data));
  }, []);

  useEffect(() => {
    countUncompletedTodo().then((count) => setItemLeft(count));
  }, [todos]);

  return (
    <>
      <Box
        backgroundImage={
          colorMode === "light" ? lightBackgroundImage : darkBackgroundImage
        }
        backgroundSize={"cover"}
        h={"40vh"}
      >
        <Box w={{ base: "80%", md: "60%", lg: "40%" }} p="4em 0" m="auto">
          <Header colorMode={colorMode} toggleColorMode={toggleColorMode} />
          <InputButton
            colorMode={colorMode}
            todo={todo}
            setTodo={setTodo}
            addTodo={handleAddTodo}
          />
        </Box>
      </Box>
      <Box
        h={"60vh"}
        backgroundSize={"cover"}
        background={"#242424"}
        position={"relative"}
      >
        <Box minW={"100%"} m={"auto"} position={"absolute"} top={"-10"}>
          <Box w={{ base: "80%", md: "60%", lg: "40%" }} m={"auto"}>
            <Box
              maxH={"50vh"}
              overflowY={"auto"}
              borderTopRadius={"10px"}
              backgroundColor={colorMode === "light" ? "white" : "#1a202c"}
            >
              <TodoList
                todos={todos}
                colorMode={colorMode}
                handleCompletedTodo={handleCompletedTodo}
                handleDeleteTodo={handleDeleteTodo}
                setTodos={setTodos}
              />
            </Box>
            <StatusBar
              colorMode={colorMode}
              itemLeft={itemLeft}
              handleClearAllClick={handleClearAllClick}
              handleAllClick={handleAllClick}
              handleActiveClick={handleActiveClick}
              handleCompletedClick={handleCompletedClick}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default App;
