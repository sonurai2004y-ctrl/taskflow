import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Tasks from "./pages/Tasks";
import About from "./pages/About";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";
// const API_URL = "http://localhost:3000/api";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [loading, setLoading] = useState(true);
  const [serverError, setServerError] = useState("");

  const taskStats = useMemo(() => {
    const completed = tasks.filter((task) => task.completed).length;

    return {
      total: tasks.length,
      completed,
      pending: tasks.length - completed,
    };
  }, [tasks]);

  useEffect(() => {
    async function loadTasks() {
      try {
        setLoading(true);
        setServerError("");

        const response = await fetch(`${API_URL}/tasks`);

        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }

        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error(error);
        setServerError(
          "Unable to connect to the TaskFlow backend."
        );
      } finally {
        setLoading(false);
      }
    }

    loadTasks();
  }, []);

  const addTask = useCallback(async () => {
    const title = newTask.trim();

    if (!title) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description: "New TaskFlow task",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create task");
      }

      const createdTask = await response.json();

      setTasks((currentTasks) => [
        createdTask,
        ...currentTasks,
      ]);

      setNewTask("");
    } catch (error) {
      console.error(error);
      setServerError("Failed to create task.");
    }
  }, [newTask]);

  const completeTask = useCallback(async (id) => {
    const task = tasks.find(
      (currentTask) => currentTask._id === id
    );

    if (!task) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: task.title,
          description: task.description,
          completed: !task.completed,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update task");
      }

      const updatedTask = await response.json();

      setTasks((currentTasks) =>
        currentTasks.map((currentTask) =>
          currentTask._id === id
            ? updatedTask
            : currentTask
        )
      );
    } catch (error) {
      console.error(error);
      setServerError("Failed to update task.");
    }
  }, [tasks]);

  const deleteTask = useCallback(async (id) => {
    try {
      const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      setTasks((currentTasks) =>
        currentTasks.filter(
          (task) => task._id !== id
        )
      );
    } catch (error) {
      console.error(error);
      setServerError("Failed to delete task.");
    }
  }, []);

  return (
    <>
      <Header />

      {serverError && (
        <div className="server-status error">
          {serverError}
        </div>
      )}

      <Routes>
        <Route
          path="/"
          element={
            <Dashboard
              stats={taskStats}
              loading={loading}
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
              onAddTask={addTask}
              onComplete={completeTask}
              onDelete={deleteTask}
              loading={loading}
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
