import React, { useContext } from "react";
import "./styles.css";
import SingleTodo from "./SingleTodo";
import { TodoContext } from "../context/Context";

const TodosContainer: React.FC = () => {
  const {
    state: { activeTodos, completedTodos },
  } = useContext(TodoContext);

  return (
    <div className="todos-container">
      <div className="active common">
        <div style={{ margin: "10px" }}>
          <span style={{ color: "white" }}>Active Tasks</span>
          <div className="inner-todo-container">
            {activeTodos.map((todo) => (
              <SingleTodo todo={todo} todoStatus={"active"} />
            ))}
          </div>
        </div>
      </div>
      <div className="completed common">
        <div style={{ margin: "10px" }}>
          <span style={{ color: "white" }}>Completed Tasks</span>
          <div className="inner-todo-container">
            {[...completedTodos].reverse().map((todo) => (
              <SingleTodo todo={todo} todoStatus={"completed"} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodosContainer;
