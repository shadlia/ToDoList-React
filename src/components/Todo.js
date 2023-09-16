import React from "react";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export const Todo = ({ task, toggleComplete, OnDeleteTask, onEditTask }) => {
  return (
    <div className="Todo">
      <p
        className={`${task.completed ? "completed" : ""}`}
        onClick={() => toggleComplete(task.id)}
      >
        {task.task}
      </p>
      <div>
        {task.isEditing ? (
          "editing mode "
        ) : (
          <FontAwesomeIcon
            icon={faPenToSquare}
            onClick={() => onEditTask(task.id)}
          />
        )}
        <FontAwesomeIcon icon={faTrash} onClick={() => OnDeleteTask(task.id)} />
      </div>
    </div>
  );
};
