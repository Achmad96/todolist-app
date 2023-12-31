export const handleSubmit = (todos, setTodos, inputRef) => {
  return e => {
    e.preventDefault();
    if (inputRef.current.value.trim() === "") return;
    setTodos([...todos, { title: "No title", task: inputRef.current.value, editable: false }]);
    inputRef.current.value = "";
  };
};

export const handleRemove = (todos, setTodos) => {
  return id => {
    if (todos.length === 1) {
      setTodos([]);
      localStorage.removeItem("todos");
    } else {
      setTodos(todos.filter(todo => todo.id !== id));
    }
  };
};

export const handleEdit = (todos, setTodos) => {
  return (id, newTitle, newTask) => {
    const i = todos.findIndex(todo => todo.id === id);
    if (i !== -1 && newTask.trim() !== "") {
      setTodos(todos.map(todo => (todo.id === id ? { ...todo, title: newTitle, task: newTask } : todo)));
    } else if (i !== -1 && newTask.trim() === "") {
      handleRemove(todos, setTodos)(id);
    }
  };
};

export const handleEditElement = (todos, setTodos, todosEl) => {
  return todoId => {
    const selectedTodoElement = todosEl.current.querySelector(`[data-todo-id="${todoId}"] .task p`);
    if (selectedTodoElement) {
      setTodos(todos.map(todo => (todo.id === todoId ? { ...todo, editable: true } : todo)));
    }
  };
};

export const handleCopy = value => {
  navigator.clipboard.writeText(value);
};
