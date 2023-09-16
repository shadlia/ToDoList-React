import React, { useState } from "react";

export const EditToDoForm = ({ task, OnUpdateTask }) => {
  const [val, setVal] = useState(task.task);

  const handlesubmit = (e) => {
    e.preventDefault();
    OnUpdateTask(task.id, val);
  };
  return (
    <div>
      <form className="TodoForm" onSubmit={handlesubmit}>
        <input
          type="text"
          className="todo-input"
          placeholder="what is the task today?"
          value={val}
          onChange={(e) => setVal(e.target.value)}
        ></input>
        <button type="submit" className="todo-btn">
          Update Task
        </button>
      </form>
    </div>
  );
};
