import React, { useState } from "react";
import "./App.css";
import InputField from "./components/InputField";
import ShowTodos from "./components/ShowTodos";
import { Todo } from "./models/models";

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const addTodos = (todo: string) => {
    setTodos([
      ...todos,
      { id: Date.now(), todo, isDone: false, isEdit: false },
    ]);
  };

  const deleteTodo = (id: number) => {
    const newTodos = todos.filter((todo: any) => todo.id !== id);
    setTodos(newTodos);
  };

  const toggleIsDone = (id: number) => {
    const newTodos = todos.map((todo: any) => {
      if (todo.id === id) return { ...todo, isDone: !todo.isDone };
      return todo;
    });
    setTodos(newTodos);
  };

  const toggleIsEdit = (id: number) => {
    const newTodos = todos.map((todo: any) => {
      if (todo.id === id) return { ...todo, isEdit: !todo.isEdit };
      return todo;
    });
    setTodos(newTodos);
  };

  const editTodo = (id: number, newTodoValue: string) => {
    const newTodos = todos.map((todo: any) => {
      if (todo.id === id) return { ...todo, todo: newTodoValue };
      return todo;
    });
    setTodos(newTodos);
  };

  return (
    <div className="App">
      <span className="heading">Taskify</span>
      <InputField addTodo={addTodos} />
      <ShowTodos
        todos={todos}
        deleteTodo={deleteTodo}
        toggleIsDone={toggleIsDone}
        toggleIsEdit={toggleIsEdit}
        editTodo={editTodo}
      />
    </div>
  );
};

export default App;
