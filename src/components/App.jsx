import "./App.css";
import Header from "./components/Header";
import StatsCard from "./components/StatsCard";
import TaskCard from "./components/TaskCard";

function App() {
  return (
    <div className="app">
      <Header />

      <main className="main">
        <section className="stats">
          <StatsCard title="Total Tasks" value="3" />
          <StatsCard title="Completed" value="1" />
          <StatsCard title="Pending" value="2" />
        </section>

        <section className="tasks">
          <TaskCard
            title="Learn React Components"
            description="Understand reusable components and props."
            status="Pending"
          />

          <TaskCard
            title="Create TaskFlow UI"
            description="Build the initial task management interface."
            status="Completed"
          />

          <TaskCard
            title="Study Git"
            description="Practice commits and repository management."
            status="Pending"
          />
        </section>
      </main>
    </div>
  );
}

export default App;
