import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { Routes, Route } from "react-router-dom";

import "./App.css";

import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import About from "./pages/About";

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("taskflow-tasks");

    return savedTasks
      ? JSON.parse(savedTasks)
      : [
          {
            id: 1,
            title: "Learn React Components",
            description: "Understand reusable components and props.",
            completed: false,
          },
          {
            id: 2,
            title: "Create TaskFlow UI",
            description: "Build the task management interface.",
            completed: true,
          },
        ];
  });

  const [newTask, setNewTask] = useState("");

  const [serverStatus, setServerStatus] = useState("Checking...");

  // Save tasks to localStorage
  useEffect(() => {
    localStorage.setItem(
      "taskflow-tasks",
      JSON.stringify(tasks)
    );
  }, [tasks]);

  // Connect React to the Node.js API
  useEffect(() => {
    async function checkServer() {
      try {
        const response = await fetch(
          "http://localhost:3000/api/health"
        );

        if (!response.ok) {
          throw new Error("Server request failed");
        }

        const data = await response.json();

        setServerStatus(data.message);
      } catch (error) {
        setServerStatus("Backend server unavailable");
        console.error(error);
      }
    }

    checkServer();
  }, []);

  const taskStats = useMemo(() => {
    const completed = tasks.filter(
      (task) => task.completed
    ).length;

    return {
      total: tasks.length,
      completed,
      pending: tasks.length - completed,
    };
  }, [tasks]);

  const addTask = useCallback(() => {
    if (!newTask.trim()) {
      return;
    }

    const task = {
      id: Date.now(),
      title: newTask,
      description: "New TaskFlow task",
      completed: false,
    };

    setTasks((currentTasks) => [
      ...currentTasks,
      task,
    ]);

    setNewTask("");
  }, [newTask]);

  const completeTask = useCallback((id) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              completed: !task.completed,
            }
          : task
      )
    );
  }, []);

  const deleteTask = useCallback((id) => {
    setTasks((currentTasks) =>
      currentTasks.filter(
        (task) => task.id !== id
      )
    );
  }, []);

  return (
    <>
      <Header />

      <div className="server-status">
        Backend: {serverStatus}
      </div>

      <Routes>
        <Route
          path="/"
          element={
            <Dashboard
              stats={taskStats}
            />
          }
        />

        <Route
          path="/tasks"
          element={
            <Tasks
              tasks={tasks}
              newTask={newTask}
              setNewTask={setNewTask}
              addTask={addTask}
              completeTask={completeTask}
              deleteTask={deleteTask}
            />
          }
        />

        <Route
          path="/about"
          element={<About />}
        />
      </Routes>
    </>
  );
}

export default App;
