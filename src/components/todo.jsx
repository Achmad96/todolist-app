import React, { useRef, useEffect } from "react";
import { handleEdit, handleRemove } from "../handlers/handleTodo";

export default function Todo(props) {
  const { todo, todos, settodos } = props;
  const input = useRef();
  const edit = handleEdit(todos, settodos);
  const remove = handleRemove(todos, settodos);

  const setTask = task => {
    if (task.trim() === "") return remove(todo.id);
    edit(todo.id, task);
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    input.current.innerText = todo.task;
    // eslint-disable-next-line
  }, [todos]);

  return <div className="task" ref={input} onBlur={e => setTask(e.currentTarget.innerText)} contentEditable={true}></div>;
}
