import StatsCard from "../components/StatsCard";

function Dashboard({ tasks }) {
  const completedTasks = tasks.filter((task) => task.completed).length;
  const pendingTasks = tasks.length - completedTasks;

  return (
    <main className="container">
      <section className="welcome">
        <h2>Dashboard</h2>
        <p>Overview of your TaskFlow tasks.</p>
      </section>

      <section className="stats">
        <StatsCard title="Total Tasks" value={tasks.length} />
        <StatsCard title="Completed" value={completedTasks} />
        <StatsCard title="Pending" value={pendingTasks} />
      </section>
    </main>
  );
}

export default Dashboard;
