import { Routes, Route, Link } from "react-router-dom";
import TasksPage from "./features/tasks/pages/TasksPage";
import EmployeesPage from "./features/employees/pages/EmployeesPage.tsx";





function App() {


  return (
    <>
      <h1>Company</h1>

      <nav>
        <Link to="/">Employees</Link>
        <Link to="/">Tasks</Link>
      </nav>

      <Routes>
        <Route path="/" element={<EmployeesPage />} />
        <Route path="/tasks" element={<TasksPage />} />
      </Routes>
    </>
  )
}

export default App
