import { Routes, Route, Link } from "react-router-dom";
import EmployeesPage from "./features/employees/pages/EmployeesPage";
import Taskspage from "./features/tasks/pages/TasksPage";

import "App.css"

export default function App()
{
  return (
    <>
      <h1>Company Operations Dashboard</h1>

      <nav style={{ display: "flex", gap: 12, marginBottom: 16}}>
        <Link to="/">Employees</Link>
        <Link to="/tasks">Tasks</Link>
      </nav>

      <Routes>
        <Route path="/" element={<EmployeesPage />} />
        <Route path="/tasks" element={<Taskspage />} />
      </Routes>
    
    </>
  );
}


