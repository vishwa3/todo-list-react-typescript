import React, { useState } from "react";
import "./App.css";
import InputField from "./components/InputField";
import TodosContainer from "./components/TodosContainer";
import { Todo } from "./models/models";

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);
  const addTodos = (todo: Todo, todoToBeAdded: string) => {
    if (todoToBeAdded === "active") setTodos([...todos, todo]);
    else if (todoToBeAdded === "completed")
      setCompletedTodos([...completedTodos, todo]);
  };

  const deleteTodo = (id: number, todoToBeDeleted: string) => {
    let newTodos;
    if (todoToBeDeleted === "active") {
      newTodos = todos.filter((todo: any) => todo.id !== id);
      setTodos(newTodos);
    } else if (todoToBeDeleted === "completed") {
      newTodos = completedTodos.filter((todo: any) => todo.id !== id);
      setCompletedTodos(newTodos);
    }
  };

  const markTodoAsCompleted = (id: number, todo: Todo) => {
    deleteTodo(id, "active");
    addTodos(todo, "completed");
  };

  const markTodoAsUndone = (id: number, todo: Todo) => {
    deleteTodo(id, "completed");
    addTodos(todo, "active");
  };

  const toggleIsEdit = (id: number, todoToBeEdited: string) => {
    let newTodos;

    if (todoToBeEdited === "active") {
      newTodos = todos.map((todo: any) => {
        if (todo.id === id) return { ...todo, isEdit: !todo.isEdit };
        return todo;
      });
      setTodos(newTodos);
    } else if (todoToBeEdited === "completed") {
      newTodos = completedTodos.map((todo: any) => {
        if (todo.id === id) return { ...todo, isEdit: !todo.isEdit };
        return todo;
      });
      setCompletedTodos(newTodos);
    }
  };

  const editTodo = (
    id: number,
    newTodoValue: string,
    todoToBeEdited: string
  ) => {
    let newTodos;
    if (todoToBeEdited === "active") {
      newTodos = todos.map((todo: any) => {
        if (todo.id === id) return { ...todo, todo: newTodoValue };
        return todo;
      });
      setTodos(newTodos);
    } else if (todoToBeEdited === "completed") {
      newTodos = completedTodos.map((todo: any) => {
        if (todo.id === id) return { ...todo, todo: newTodoValue };
        return todo;
      });
      setCompletedTodos(newTodos);
    }
  };

  return (
    <div className="App">
      <span className="heading">Taskify</span>
      <InputField addTodo={addTodos} />
      <TodosContainer
        todos={todos}
        completedTodos={completedTodos}
        deleteTodo={deleteTodo}
        toggleIsEdit={toggleIsEdit}
        editTodo={editTodo}
        markTodoAsCompleted={markTodoAsCompleted}
        markTodoAsUndone={markTodoAsUndone}
      />
    </div>
  );
};

export default App;
