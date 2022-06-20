import React, { useContext } from "react";
import { Todo } from "../models/models";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { VscDebugRestart } from "react-icons/vsc";
import { MdDone } from "react-icons/md";
import "./styles.css";
import { TodoContext } from "../context/Context";

interface Props {
  todo: Todo;
  todoStatus: string;
}

const SingleTodo: React.FC<Props> = ({ todo, todoStatus }: Props) => {
  const { dispatch } = useContext(TodoContext);

  return (
    <>
      <div key={todo.id} className="todoItem">
        <div className="todoItem-container">
          {todo.isEdit ? (
            <input
              value={todo.todo}
              onChange={(e) =>
                dispatch({
                  type: "EDIT_TODO",
                  payload: {
                    id: todo.id,
                    newTodoValue: e.target.value,
                    todoToBeEdited: todoStatus,
                  },
                })
              }
              onBlur={() =>
                dispatch({
                  type: "TOGGLE_IS_EDIT",
                  payload: { id: todo.id, todoToBeEdited: todoStatus },
                })
              }
              autoFocus
              onKeyUp={(e) => {
                if (e.key === "Enter")
                  dispatch({
                    type: "TOGGLE_IS_EDIT",
                    payload: { id: todo.id, todoToBeEdited: todoStatus },
                  });
              }}
            />
          ) : todoStatus === "active" ? (
            todo.todo
          ) : (
            <s>{todo.todo}</s>
          )}
          <span className="icons">
            <span
              className="icon"
              onClick={() =>
                dispatch({
                  type: "TOGGLE_IS_EDIT",
                  payload: { id: todo.id, todoToBeEdited: todoStatus },
                })
              }
            >
              <AiFillEdit />
            </span>

            <span
              className="icon"
              onClick={() =>
                dispatch({
                  type: "REMOVE_TASK",
                  payload: { id: todo.id, todoToBeDeleted: todoStatus },
                })
              }
            >
              <AiFillDelete />
            </span>
            {todoStatus === "active" ? (
              <span
                className="icon"
                onClick={() => {
                  dispatch({
                    type: "REMOVE_TASK",
                    payload: { id: todo.id, todoToBeDeleted: todoStatus },
                  });
                  dispatch({
                    type: "ADD_TASK",
                    payload: { todo: todo, todoToBeAdded: "completed" },
                  });
                }}
              >
                <MdDone />
              </span>
            ) : (
              <span
                className="icon"
                onClick={() => {
                  dispatch({
                    type: "REMOVE_TASK",
                    payload: { id: todo.id, todoToBeDeleted: todoStatus },
                  });
                  dispatch({
                    type: "ADD_TASK",
                    payload: { todo: todo, todoToBeAdded: "active" },
                  });
                }}
              >
                <VscDebugRestart />
              </span>
            )}
          </span>
        </div>
      </div>
    </>
  );
};

export default SingleTodo;
