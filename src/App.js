import React, { useEffect, useState } from "react";
import "./App.scss";
import Main from "./page/Main";

import { withAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import Amplify, { API, graphqlOperation } from "aws-amplify";
import { listTodos } from "./graphql/queries";
import { createTodo, updateTodo } from "./graphql/mutations";

const App = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    try {
      const todosData = await API.graphql(graphqlOperation(listTodos));
      const todos = todosData.data.listTodos.items;
      setTasks(todos);
    } catch (err) {
      console.log("error fetching todos");
    }
  };

  const addTask = async (value) => {
    const task = { name: value, id: tasks.length + 1 };
    setTasks([...tasks, task]);
    try {
      await API.graphql(graphqlOperation(createTodo, { input: task }));
    } catch (err) {
      console.log("error creating todo:", err);
    }
  };

  const changeTaskStatus = async (id, doneStatus) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, done: doneStatus } : task
      )
    );

    try {
      await API.graphql(graphqlOperation(updateTodo, { input: { id, done: doneStatus} }));
    } catch (err) {
      console.log("error creating todo:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <AmplifySignOut />
      <Main tasks={tasks} addTask={addTask} changeTaskStatus={changeTaskStatus} />
    </div>
  );
};

export default withAuthenticator(App, true);
