import StatsCard from "../components/StatsCard";

function Dashboard({ stats }) {
  return (
    <main className="container">
      <section className="welcome">
        <h2>Dashboard</h2>
        <p>Overview of your TaskFlow tasks.</p>
      </section>

      <section className="stats">
        <StatsCard
          title="Total Tasks"
          value={stats.total}
        />

        <StatsCard
          title="Completed"
          value={stats.completed}
        />

        <StatsCard
          title="Pending"
          value={stats.pending}
        />
      </section>
    </main>
  );
}

export default Dashboard;
