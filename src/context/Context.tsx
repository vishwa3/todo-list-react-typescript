import React, { useReducer, createContext } from "react";
import { Todo } from "../models/models";

interface InitialStateType {
  activeTodos: Todo[];
  completedTodos: Todo[];
}

const initialState = {
  activeTodos: [],
  completedTodos: [],
};

type Actions =
  | { type: "ADD_TASK"; payload: { todo: Todo; todoToBeAdded: string } }
  | { type: "REMOVE_TASK"; payload: { id: number; todoToBeDeleted: string } }
  | { type: "TOGGLE_IS_EDIT"; payload: { id: number; todoToBeEdited: string } }
  | {
      type: "EDIT_TODO";
      payload: { id: number; newTodoValue: string; todoToBeEdited: string };
    };

export const todoReducer = (
  state: InitialStateType = initialState,
  action: Actions
): InitialStateType => {
  const { type, payload } = action;
  const { activeTodos, completedTodos } = state;
  let newTodos = state;
  if (type === "ADD_TASK") {
    const { todo, todoToBeAdded } = payload;

    if (todoToBeAdded === "active")
      newTodos = { ...state, activeTodos: [...activeTodos, todo] };
    else if (todoToBeAdded === "completed")
      newTodos = { ...state, completedTodos: [...completedTodos, todo] };
  } else if (type === "REMOVE_TASK") {
    const { id, todoToBeDeleted } = payload;
    if (todoToBeDeleted === "active") {
      newTodos = {
        ...state,
        activeTodos: activeTodos.filter((todo: any) => todo.id !== id),
      };
    } else if (todoToBeDeleted === "completed") {
      newTodos = {
        ...state,
        completedTodos: completedTodos.filter((todo: any) => todo.id !== id),
      };
    }
  } else if (type === "TOGGLE_IS_EDIT") {
    const { id, todoToBeEdited } = payload;
    if (todoToBeEdited === "active") {
      newTodos = {
        ...state,
        activeTodos: activeTodos.map((todo: any) => {
          if (todo.id === id) return { ...todo, isEdit: !todo.isEdit };
          return todo;
        }),
      };
    } else if (todoToBeEdited === "completed") {
      newTodos = {
        ...state,
        completedTodos: completedTodos.map((todo: any) => {
          if (todo.id === id) return { ...todo, isEdit: !todo.isEdit };
          return todo;
        }),
      };
    }
  } else if (type === "EDIT_TODO") {
    const { id, newTodoValue, todoToBeEdited } = payload;
    if (todoToBeEdited === "active") {
      newTodos = {
        ...state,
        activeTodos: activeTodos.map((todo: any) => {
          if (todo.id === id) return { ...todo, todo: newTodoValue };
          return todo;
        }),
      };
    } else if (todoToBeEdited === "completed") {
      newTodos = {
        ...state,
        completedTodos: completedTodos.map((todo: any) => {
          if (todo.id === id) return { ...todo, todo: newTodoValue };
          return todo;
        }),
      };
    }
  }
  return newTodos;
};

const TodoContext = createContext<{
  state: InitialStateType;
  dispatch: (action: Actions) => void;
}>({ state: initialState, dispatch: () => {} });

const TodoContextProvider = (props: any) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {props.children}
    </TodoContext.Provider>
  );
};

export { TodoContextProvider, TodoContext };
