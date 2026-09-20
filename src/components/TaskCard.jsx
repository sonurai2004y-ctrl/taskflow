function TaskCard({ task, onComplete, onDelete }) {
  return (
    <div className="task-card">
      <h3>{task.title}</h3>
      <p>{task.description}</p>

      <span>{task.completed ? "Completed" : "Pending"}</span>

      {!task.completed && (
        <button onClick={() => onComplete(task.id)}>
          Complete
        </button>
      )}

      <button onClick={() => onDelete(task.id)}>
        Delete
      </button>
    </div>
  );
}

export default TaskCard;
