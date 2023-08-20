import React, { useRef, useEffect } from "react";
import { handleEdit } from "../handlers/handleTodo";

export default function Todo(props) {
  const { todo, todos, set } = props;
  const input = useRef();

  const setContents = content => {
    const title = content.getElementsByTagName("h3")[0].innerText.toString();
    const task = content.getElementsByTagName("p")[0].innerText.toString();
    const edit = handleEdit(todos, set);
    todo.editable = false;
    edit(todo.id, title, task);
  };

  useEffect(() => {
    const title = input.current.getElementsByTagName("h3")[0];
    const task = input.current.getElementsByTagName("p")[0];
    title.innerText = todo.title;
    task.innerText = todo.task;
    localStorage.setItem("todos", JSON.stringify(todos));

    // eslint-disable-next-line
  }, [todos]);

  return (
    <div className="task" ref={input} onBlur={() => setContents(input.current)}>
      {/* eslint-disable-next-line*/}
      <h3 contentEditable={todo.editable} />
      <p contentEditable={todo.editable} />
    </div>
  );
}
