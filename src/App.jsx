import "./App.css";

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>TaskFlow</h1>
        <p>Full Stack Task Management System</p>
      </header>

      <main className="main">
        <section className="welcome">
          <h2>Welcome to TaskFlow</h2>
          <p>
            Organize tasks, track progress, and manage your work efficiently.
          </p>

          <button className="primary-button">
            Create Your First Task
          </button>
        </section>

        <section className="stats">
          <div className="stat-card">
            <h3>0</h3>
            <p>Total Tasks</p>
          </div>

          <div className="stat-card">
            <h3>0</h3>
            <p>Completed</p>
          </div>

          <div className="stat-card">
            <h3>0</h3>
            <p>Pending</p>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
