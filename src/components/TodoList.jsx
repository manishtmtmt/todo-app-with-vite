/* eslint-disable react/prop-types */
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import TodoItem from "./TodoItem";
import { updateReOrderedTodos } from "../actions";
import { v4 } from "uuid";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const TodoList = ({
  todos,
  colorMode,
  handleCompletedTodo,
  handleDeleteTodo,
  setTodos,
}) => {
  const onDragEnd = async (result) => {
    if (!result.destination) return;

    if (result.destination.index === result.source.index) return;

    const updatedTodos = reorder(
      todos,
      result.source.index,
      result.destination.index
    );

    setTodos(updatedTodos);
    await updateReOrderedTodos(updatedTodos);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={v4()}>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {todos.length > 0 &&
              todos.map((todo, index) => (
                <TodoItem
                  key={todo.id}
                  colorMode={colorMode}
                  todo={todo}
                  handleCompletedTodo={handleCompletedTodo}
                  handleDeleteTodo={handleDeleteTodo}
                  index={index}
                />
              ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TodoList;
