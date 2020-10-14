import React from "react";

const Task = ({ task, changeTaskStatus }) => {
  return (
    <div className="task-list__item">
      <div
        onClick={() => changeTaskStatus(task.id, !task.done)}
        className={`task-list__check ${task.done && "task-list__check--done"}`}
      ></div>
      <div
        className={`task-list__title ${task.done && "task-list__title--done"}`}
      >
        {task.name}
      </div>
    </div>
  );
};

export default Task;
