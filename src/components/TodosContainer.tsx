import React from "react";
import "./styles.css";
import { Todo } from "../models/models";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { VscDebugRestart } from "react-icons/vsc";
import { MdDone } from "react-icons/md";

interface Props {
  todos: Todo[];
  completedTodos: Todo[];
  deleteTodo: (id: number, todoToBeDeleted: string) => void;
  toggleIsEdit: (id: number, todoToBeEdited: string) => void;
  editTodo: (id: number, newTodoValue: string, todoToBeEdited: string) => void;
  markTodoAsCompleted: (id: number, todo: Todo) => void;
  markTodoAsUndone: (id: number, todo: Todo) => void;
}

const TodosContainer: React.FC<Props> = ({
  todos,
  completedTodos,
  deleteTodo,
  toggleIsEdit,
  editTodo,
  markTodoAsCompleted,
  markTodoAsUndone,
}: Props) => {
  return (
    <div className="todos-container">
      <div className="active common">
        <div style={{ margin: "10px" }}>
          <span style={{ color: "white" }}>Active Tasks</span>
          <div className="inner-todo-container">
            {todos.map((todo) => (
              <div key={todo.id} className="todoItem">
                <div className="todoItem-container">
                  {todo.isEdit ? (
                    <input
                      value={todo.todo}
                      onChange={(e) =>
                        editTodo(todo.id, e.target.value, "active")
                      }
                      onBlur={() => toggleIsEdit(todo.id, "active")}
                      autoFocus
                      onKeyUp={(e) => {
                        if (e.key === "Enter")
                          return toggleIsEdit(todo.id, "active");
                      }}
                    />
                  ) : (
                    todo.todo
                  )}
                  <span className="icons">
                    <span
                      className="icon"
                      onClick={() => toggleIsEdit(todo.id, "active")}
                    >
                      <AiFillEdit />
                    </span>

                    <span
                      className="icon"
                      onClick={() => deleteTodo(todo.id, "active")}
                    >
                      <AiFillDelete />
                    </span>
                    <span
                      className="icon"
                      onClick={() => markTodoAsCompleted(todo.id, todo)}
                    >
                      <MdDone />
                    </span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="completed common">
        <div style={{ margin: "10px" }}>
          <span style={{ color: "white" }}>Completed Tasks</span>
          <div className="inner-todo-container">
            {[...completedTodos].reverse().map((todo) => (
              <div key={todo.id} className="todoItem">
                <div className="todoItem-container">
                  {todo.isEdit ? (
                    <input
                      value={todo.todo}
                      onChange={(e) =>
                        editTodo(todo.id, e.target.value, "completed")
                      }
                      onBlur={() => toggleIsEdit(todo.id, "completed")}
                      autoFocus
                      onKeyUp={(e) => {
                        if (e.key === "Enter")
                          return toggleIsEdit(todo.id, "completed");
                      }}
                    />
                  ) : (
                    <s>{todo.todo}</s>
                  )}
                  <span className="icons">
                    <span
                      className="icon"
                      onClick={() => toggleIsEdit(todo.id, "completed")}
                    >
                      <AiFillEdit />
                    </span>

                    <span
                      className="icon"
                      onClick={() => deleteTodo(todo.id, "completed")}
                    >
                      <AiFillDelete />
                    </span>
                    <span
                      className="icon"
                      onClick={() => markTodoAsUndone(todo.id, todo)}
                    >
                      <VscDebugRestart />
                    </span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodosContainer;
