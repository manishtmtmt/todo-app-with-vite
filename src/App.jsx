/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Box, useColorMode } from "@chakra-ui/react";
import { v4 } from "uuid";

import lightBackgroundImage from "./assets/bg-desktop-light.jpg";
import darkBackgroundImage from "./assets/bg-desktop-dark.jpg";
import Header from "./components/Header";
import InputButton from "./components/InputButton";
import { addTodo, deleteTodo, fetchTodos, markTodoCompleted } from "./actions";
import TodoList from "./components/TodoList";

function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

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
  };

  const handleDeleteTodo = async (id) => {
    await deleteTodo(id);
    setTodos(await fetchTodos());
  };

  useEffect(() => {
    fetchTodos().then((data) => setTodos(data));
  }, []);

  return (
    <>
      <Box
        backgroundImage={
          colorMode === "light" ? lightBackgroundImage : darkBackgroundImage
        }
        backgroundSize={"cover"}
        h={"40vh"}
      >
        <Box w="50%" p="4em 0" m="auto">
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
        <Box
          w={"50%"}
          position={"absolute"}
          top={"-10"}
          left={{ lg: "23.2em", md: "15.2em", base: "11.2em" }}
          borderRadius={"5px"}
          background={colorMode === "light" ? "white" : "#1a202c"}
        >
          <Box maxH={"50vh"} overflowY={"auto"}>
            <TodoList
              todos={todos}
              colorMode={colorMode}
              handleCompletedTodo={handleCompletedTodo}
              handleDeleteTodo={handleDeleteTodo}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default App;
