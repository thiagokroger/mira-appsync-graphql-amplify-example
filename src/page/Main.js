import React, { useEffect, useState } from "react";
import Task from "../components/Task";

const Main = ({ tasks, addTask, changeTaskStatus }) => {
  const [newTask, setNewTask] = useState("");
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div className="app">
      <div>Tasks</div>
      {tasks
        .sort((a, b) => (a.done === b.done ? 0 : a.done ? 1 : -1))
        .map((task) => (
          <Task key={task.id} task={task} changeTaskStatus={changeTaskStatus} />
        ))}
      <div>
        {!showAdd ? (
          <div className="add-task" onClick={() => setShowAdd(true)}>
            <span className="plus-icon">+</span> Add Task
          </div>
        ) : (
          <div className="create-task-row">
            <input
              type="text"
              placeholder="e.g. Some meeting"
              className="input"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            ></input>
            <button
              type="button"
              className="add-button"
              onClick={async () => {
                if (newTask) {
                  addTask(newTask);
                  setNewTask('');
                  setShowAdd(false)
                }
              }}
            >
              Add task
            </button>
            <button
              type="button"
              className="cancel-button"
              onClick={() => [setNewTask("", setShowAdd(false))]}
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Main;
