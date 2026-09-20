import { useRef } from "react";
import TaskCard from "../components/TaskCard";

function Tasks({
  tasks,
  newTask,
  setNewTask,
  addTask,
  completeTask,
  deleteTask,
}) {
  const inputRef = useRef(null);

  function focusInput() {
    inputRef.current.focus();
  }

  return (
    <main className="container">
      <section className="welcome">
        <h2>Tasks</h2>
        <p>Create and manage your tasks.</p>
      </section>

      <section className="task-input">
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter a new task..."
          value={newTask}
          onChange={(event) =>
            setNewTask(event.target.value)
          }
        />

        <button onClick={addTask}>
          Create Task
        </button>

        <button
          className="secondary-button"
          onClick={focusInput}
        >
          Focus Input
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
  );
}

export default Tasks;
