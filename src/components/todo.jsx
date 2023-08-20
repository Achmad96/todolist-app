import React, { useRef, useEffect } from "react";
import { handleEdit, handleRemove } from "../handlers/handleTodo";

export default function Todo(props) {
  const { todo, todos, set } = props;
  const input = useRef();
  const remove = handleRemove(todos, set);

  const setContents = content => {
    const title = content.getElementsByTagName("h3")[0].innerText.toString();
    const task = content.getElementsByTagName("p")[0].innerText.toString();
    const edit = handleEdit(todos, set);

    if (task?.trim() === "") return remove(todo.id);

    edit(todo.id, title, task);
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));

    const title = input.current.getElementsByTagName("h3")[0];
    const task = input.current.getElementsByTagName("p")[0];
    title.innerText = todo.title;
    task.innerText = todo.task;

    // eslint-disable-next-line
  }, [todos]);

  return (
    <div className="task" ref={input} onBlur={() => setContents(input.current)}>
      <h3 contentEditable={true} />
      <p contentEditable={true} />
    </div>
  );
}
