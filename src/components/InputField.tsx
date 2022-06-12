import React, { useRef, useState } from "react";
import "./styles.css";

interface Props {
  addTodo: (param: any) => void;
}

const InputField: React.FC<Props> = ({ addTodo }: Props) => {
  const [todo, setTodo] = useState<string>("");

  const inputRref = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo !== undefined && todo !== null && todo !== "") {
      addTodo(todo);
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
