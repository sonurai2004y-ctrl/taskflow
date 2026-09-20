import { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import StatsCard from "./components/StatsCard";
import TaskCard from "./components/TaskCard";

function App() {
  const [tasks, setTasks] = useState([
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
  ]);

  const [newTask, setNewTask] = useState("");

  function addTask() {
    if (newTask.trim() === "") {
      return;
    }

    const task = {
      id: Date.now(),
      title: newTask,
      description: "New TaskFlow task",
      completed: false,
    };

    setTasks((currentTasks) => [...currentTasks, task]);
    setNewTask("");
  }

  function completeTask(id) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id
          ? { ...task, completed: true }
          : task
      )
    );
  }

  function deleteTask(id) {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== id)
    );
  }

  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;

  const pendingTasks = tasks.length - completedTasks;

  return (
    <div className="app">
      <Header />

      <main className="main">
        <section className="stats">
          <StatsCard
            title="Total Tasks"
            value={tasks.length}
          />

          <StatsCard
            title="Completed"
            value={completedTasks}
          />

          <StatsCard
            title="Pending"
            value={pendingTasks}
          />
        </section>

        <section className="task-input">
          <input
            type="text"
            value={newTask}
            onChange={(event) => setNewTask(event.target.value)}
            placeholder="Enter a new task"
          />

          <button onClick={addTask}>
            Create Task
          </button>
        </section>

        <section className="tasks">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onComplete={completeTask}
              onDelete={deleteTask}
            />
          ))}
        </section>
      </main>
    </div>
  );
}

export default App;
