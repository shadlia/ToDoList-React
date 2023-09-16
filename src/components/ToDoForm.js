import React, { useState } from "react";

export const ToDoForm = ({ OnAddtodo }) => {
  const [val, setVal] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    OnAddtodo(val);
    setVal("");
  };
  return (
    <div>
      <form className="TodoForm" onSubmit={handleSubmit}>
        <input
          type="text"
          className="todo-input"
          placeholder="what is the task today?"
          value={val}
          onChange={(e) => setVal(e.target.value)}
        ></input>
        <button type="submit" className="todo-btn">
          Add Task
        </button>
      </form>
    </div>
  );
};
