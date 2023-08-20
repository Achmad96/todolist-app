export const handleSubmit = (todos, setTodos, inputRef) => {
  return e => {
    e.preventDefault();
    if (inputRef.current.value.trim() === "") return;
    setTodos([...todos, { task: inputRef.current.value, done: false }]);
    inputRef.current.value = "";
  };
};

export const handleRemove = (todos, setTodos) => {
  return id => {
    setTodos(todos.filter(todo => todo.id !== id));
  };
};

export const handleEdit = (todos, setTodos) => {
  return (id, newTask) => {
    const i = todos.findIndex(todo => todo.id === id);
    if (i !== -1 && newTask.trim() !== "") {
      setTodos(todos.map(todo => (todo.id === id ? { ...todo, task: newTask } : todo)));
    } else if (i !== -1 && newTask.trim() === "") {
      handleRemove(todos, setTodos)(id);
    }
  };
};
