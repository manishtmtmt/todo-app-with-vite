/* eslint-disable react/prop-types */
import { Flex, Box, Image, Text } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";

import checkIcon from "../assets/icon-check.svg";
import Circle from "./Circle";
import { isTodoCompleted } from "../actions";
import { Draggable } from "react-beautiful-dnd";

const TodoItem = ({
  todo,
  colorMode,
  handleCompletedTodo,
  handleDeleteTodo,
  index,
}) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const handleClick = async (id) => {
    await handleCompletedTodo(id);
    setIsCompleted(await isTodoCompleted(id));
  };

  useEffect(() => {
    isTodoCompleted(todo.id).then((data) => {
      setIsCompleted(data);
    });
  }, [todo.id]);

  return (
    <Draggable draggableId={todo.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Flex
            p="1.1em"
            h="4.4em"
            borderBottom="1px solid grey"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
          >
            <Flex alignItems={"center"} minW={"100%"}>
              <Box cursor={"pointer"} onClick={() => handleClick(todo.id)}>
                {isCompleted ? (
                  <Flex
                    w="24px"
                    h="24px"
                    borderRadius={"50%"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    background={
                      "linear-gradient(90deg, hsl(192, 100%, 67%), hsl(280, 87%, 65%))"
                    }
                  >
                    <Image src={checkIcon} />
                  </Flex>
                ) : (
                  <Circle width={"22px"} height={"22px"} />
                )}
              </Box>
              <Flex ml="1em" justifyContent={"space-between"} w="100%">
                <Text
                  fontWeight={"700"}
                  fontSize={"1.2rem"}
                  textDecoration={isCompleted ? "line-through" : "none"}
                  color={
                    isCompleted
                      ? "grey"
                      : colorMode === "light"
                      ? "black"
                      : "white"
                  }
                >
                  {todo.title}
                </Text>
                {isVisible && (
                  <Box
                    cursor="pointer"
                    onClick={() => handleDeleteTodo(todo.id)}
                  >
                    <CloseIcon />
                  </Box>
                )}
              </Flex>
            </Flex>
          </Flex>
        </div>
      )}
    </Draggable>
  );
};

export default TodoItem;
