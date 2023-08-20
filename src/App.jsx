import "./App.css";
import Todo from "./components/todo";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { handleSubmit } from "./handlers/handleTodo";

function App() {
  const inputTodos = useRef(null);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const storedData = localStorage.getItem("todos");
    const parsedData = storedData ? JSON.parse(storedData) : [];
    setTodos(parsedData);
  }, []);

  return (
    <div className="App">
      <div className="header-container">
        <h1 className="App-title">TODOLIST APP</h1>
        <p className="info">
          There are <span style={{ color: "yellow" }}>{todos.filter(todo => !todo?.done).length}</span> todo(s) not completed.
        </p>
        <div className="header-wrapper">
          <input type="text" ref={inputTodos} onKeyDown={e => e.key === "Enter" && handleSubmit(todos, setTodos, inputTodos)(e)} placeholder="Enter new task" />
          <button type="submit" onClick={handleSubmit(todos, setTodos, inputTodos)}>
            Add
          </button>
          <button
            type="submit"
            onClick={() => {
              setTodos([]);
              localStorage.removeItem("todos");
            }}>
            Clear
          </button>
        </div>
      </div>
      <div className="content-container">
        <motion.ul className="content-wrapper" layout transition={{ duration: 0.5 }}>
          <AnimatePresence>
            {todos.length > 0 &&
              todos.map((todo, index) => {
                todo.id = index;
                return (
                  <motion.li
                    layout
                    key={todo.id}
                    className="todo-container"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    layoutId={todo?.id}
                    whileHover={{ scale: 1.05 }}>
                    <Todo todo={todo} set={setTodos} todos={todos} />
                  </motion.li>
                );
              })}
          </AnimatePresence>
        </motion.ul>
      </div>
    </div>
  );
}

export default App;
