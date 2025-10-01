import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./pages/Home";
import Detalles from "./pages/Detalles";
import Crear from "./pages/Crear";
// Importación corregida para que el nombre del componente coincida con el archivo
import Editor from "./pages/Editor";
import tasksData from "./data/tasksData";
import "./index.css";

function App() {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : tasksData;
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <Router>
      <nav>
        <Link to="/">Lista de Tareas</Link>
        <Link to="/create">Nueva Tarea</Link>
      </nav>

      <div className="container">
        <Routes>
          <Route path="/" element={<Home tasks={tasks} />} />
          <Route
            path="/task/:id"
            element={<Detalles tasks={tasks} setTasks={setTasks} />}
          />
          <Route
            path="/create"
            element={<Crear tasks={tasks} setTasks={setTasks} />}
          />
          <Route
            path="/edit/:id"
            // El componente debe ser "Editor" (con mayúscula)
            element={<Editor tasks={tasks} setTasks={setTasks} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;