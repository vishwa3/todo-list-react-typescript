import React from "react";
import "./App.css";
import InputField from "./components/InputField";
import TodosContainer from "./components/TodosContainer";
import { TodoContextProvider } from "./context/Context";

const App: React.FC = () => {
  return (
    <TodoContextProvider>
      <div className="App">
        <span className="heading">Taskify</span>
        <InputField />
        <TodosContainer />
      </div>
    </TodoContextProvider>
  );
};

export default App;
