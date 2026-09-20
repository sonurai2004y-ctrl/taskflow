import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <div>
        <h1>TaskFlow</h1>
        <p>Full Stack Task Management System</p>
      </div>

      <nav>
        <NavLink to="/">Dashboard</NavLink>
        <NavLink to="/tasks">Tasks</NavLink>
        <NavLink to="/about">About</NavLink>
      </nav>
    </header>
  );
}

export default Header;

