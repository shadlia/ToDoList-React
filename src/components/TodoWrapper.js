import React, { useState } from "react";
import { ToDoForm } from "./ToDoForm";
import { v4 as uuidv4 } from "uuid";
import { Todo } from "./Todo";
import { EditToDoForm } from "./EditToDoForm";
uuidv4();
export const TodoWrapper = () => {
  const [ShowAddTask, setShowAddTask] = useState(true);
  const [todos, setTodos] = useState([]);
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
  return (
    <div className="TodoWrapper">
      <h1>Get things Done now</h1>
      <button className="close-btn" onClick={handleShowAddTask}>
        {ShowAddTask ? "X" : "+ New Task"}
      </button>
      {ShowAddTask && <ToDoForm OnAddtodo={handleAddtodo} />}
      <div className="start-adding">
        {todos.length === 0 && ShowAddTask === false
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
