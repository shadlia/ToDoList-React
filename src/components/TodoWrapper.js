import React, { useState, useEffect } from "react";
import { ToDoForm } from "./ToDoForm";
import { v4 as uuidv4 } from "uuid";
import { Todo } from "./Todo";
import { EditToDoForm } from "./EditToDoForm";
uuidv4();
export const TodoWrapper = () => {
  const [ShowAddTask, setShowAddTask] = useState(true);
  const [todos, setTodos] = useState(() => {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  });
  const [TaskToEdit, setTaskToEdit] = useState(null);
  const handleAddtodo = (todo) => {
    if (!todo) return;
    setTodos([
      ...todos,
      {
        id: uuidv4(),
        task: todo,
        completed: false,
        isEditing: false,
      },
    ]);
  };
  const handleShowAddTask = () => {
    setShowAddTask(!ShowAddTask);
  };
  const handleComplete = (taskId) => {
    setTodos(
      todos.map((todo) =>
        todo.id === taskId ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  const handleDeleteTask = (taskId) => {
    setTodos(todos.filter((todo) => todo.id !== taskId));
  };
  const handleEditTask = (taskId) => {
    setTodos(
      todos.map((todo) =>
        todo.id === taskId ? { ...todo, isEditing: !todo.isEditing } : todo
      )
    );
    setTaskToEdit(taskId);
  };
  const handleUpdateTask = (taskId, val) => {
    setTodos(
      todos.map((todo) =>
        todo.id === taskId ? { ...todo, task: val, isEditing: false } : todo
      )
    );
    setTaskToEdit(null);
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(todos));
  }, [todos]);

  return (
    <div className="TodoWrapper">
      {ShowAddTask ? (
        <ToDoForm OnAddtodo={handleAddtodo} OnShowAdd={handleShowAddTask} />
      ) : (
        <button className="close-btn" onClick={handleShowAddTask}>
          + New Task
        </button>
      )}
      <h1> {todos.length === 0 ? "Get things Done now" : "Your tasks"}</h1>
      <div className="start-adding">
        {todos.length === 0
          ? "start adding tasks  ..."
          : todos.map((todo, index) =>
              todo.isEditing ? (
                <EditToDoForm
                  task={todo}
                  key={index}
                  OnUpdateTask={handleUpdateTask}
                />
              ) : (
                <Todo
                  task={todo}
                  key={index}
                  toggleComplete={handleComplete}
                  OnDeleteTask={handleDeleteTask}
                  onEditTask={handleEditTask}
                />
              )
            )}
      </div>
    </div>
  );
};
