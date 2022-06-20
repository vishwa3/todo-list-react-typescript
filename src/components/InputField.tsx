import React, { useRef, useState, useContext } from "react";
import "./styles.css";

import { TodoContext } from "../context/Context";

const InputField: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const { dispatch } = useContext(TodoContext);
  const inputRref = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo !== undefined && todo !== null && todo !== "") {
      dispatch({
        type: "ADD_TASK",
        payload: {
          todo: { id: Date.now(), todo: todo, isEdit: false },
          todoToBeAdded: "active",
        },
      });
      setTodo("");
    }
    inputRref.current?.blur();
  };
  const handleInputChange = (e: any) => {
    e.preventDefault();
    setTodo(e.target.value);
  };

  return (
    <form className="input" onSubmit={handleSubmit}>
      <input
        onChange={handleInputChange}
        type="text"
        placeholder="Enter a task"
        className="inputBox"
        value={todo}
        ref={inputRref}
      />
      <button type="submit" className="input-submit">
        GO
      </button>
    </form>
  );
};

export default InputField;
