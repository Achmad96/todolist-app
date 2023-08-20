import "./App.css";
import Todo from "./components/todo";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { handleSubmit, handleRemove, handleEditElement, handleCopy } from "./handlers/handleTodo";
import MenuContext from "./context/menuContext";

function App() {
  const inputTodos = useRef(null);
  const todosEl = useRef(null);
  const [todos, setTodos] = useState([]);
  const [selectedId, setSelectedId] = useState(0);

  const remove = handleRemove(todos, setTodos);
  const editTodoElement = handleEditElement(todos, setTodos, todosEl);

  const [clicked, setClicked] = useState(false);
  const [points, setPoints] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const storedData = localStorage.getItem("todos");
    const parsedData = storedData ? JSON.parse(storedData) : [];
    setTodos(parsedData);
  }, []);

  useEffect(() => {
    const handleClick = () => setClicked(false);
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("click", handleClick);
    };
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
        <motion.ul ref={todosEl} className="content-wrapper" layout transition={{ duration: 0.5 }}>
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
                    whileHover={{ scale: 1.05 }}
                    data-todo-id={todo.id}
                    onContextMenu={e => {
                      e.preventDefault();
                      setClicked(true);
                      setPoints({
                        x: e.pageX,
                        y: e.pageY,
                      });
                      setSelectedId(todo.id);
                    }}>
                    <Todo todo={todo} set={setTodos} todos={todos} />
                  </motion.li>
                );
              })}
            {clicked && (
              <MenuContext style={{ backgroundColor: "var(--btnBgColor)", padding: "10px", borderRadius: "10px", position: "absolute", top: `${points.y}px`, left: `${points.x}px` }}>
                <motion.ul style={{ opacity: "70%" }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                  <motion.li onClick={() => editTodoElement(selectedId)}>Edit</motion.li>
                  <motion.li
                    onClick={() => {
                      handleCopy(todos[selectedId].title + "\n" + todos[selectedId].task);
                    }}>
                    Copy
                  </motion.li>
                  <motion.li onClick={() => remove(selectedId)}>Delete</motion.li>
                </motion.ul>
              </MenuContext>
            )}
          </AnimatePresence>
        </motion.ul>
      </div>
    </div>
  );
}

export default App;
