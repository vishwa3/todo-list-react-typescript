import React from "react";
import "./styles.css";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { Todo } from "../models/models";

interface Props {
  todos: Todo[];
  deleteTodo: (id: number) => void;
  toggleIsDone: (id: number) => void;
  toggleIsEdit: (id: number) => void;
  editTodo: (id: number, todo: string) => void;
}

const ShowTodos: React.FC<Props> = ({
  todos,
  deleteTodo,
  toggleIsDone,
  toggleIsEdit,
  editTodo,
}: Props) => {
  return (
    <div className="todos-container">
      {todos.map((todo) => (
        <div key={todo.id} className="todoItem">
          <div className="todoItem-container">
            {todo.isEdit ? (
              <input
                value={todo.todo}
                onChange={(e) => editTodo(todo.id, e.target.value)}
                onBlur={() => toggleIsEdit(todo.id)}
                autoFocus
                onKeyUp={(e) => {
                  if (e.key === "Enter") return toggleIsEdit(todo.id);
                }}
              />
            ) : todo.isDone ? (
              <s>{todo.todo}</s>
            ) : (
              todo.todo
            )}
            <span className="icons">
              {!todo.isDone && (
                <span className="icon" onClick={() => toggleIsEdit(todo.id)}>
                  <AiFillEdit />
                </span>
              )}
              <span className="icon" onClick={() => deleteTodo(todo.id)}>
                <AiFillDelete />
              </span>
              <span className="icon" onClick={() => toggleIsDone(todo.id)}>
                <MdDone />
              </span>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShowTodos;
