import { useParams, Link, useNavigate } from "react-router-dom";

// El nombre del componente debe ser "Detalles" (con mayúscula)
function Detalles({ tasks, setTasks }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const task = tasks.find((t) => t.id === parseInt(id));

  if (!task) return <p>Tarea no encontrada</p>;

  const handleDelete = () => {
    if (window.confirm("¿Seguro que deseas eliminar esta tarea?")) {
      const newTasks = tasks.filter((t) => t.id !== task.id);
      setTasks(newTasks);
      navigate("/");
    }
  };

  return (
    <div className="card">
      <h1>{task.title}</h1>
      <p>{task.description}</p>
      <p>Fecha: {task.date}</p>
      <p>Estado: {task.completed ? "✅ Completa" : "⏳ Incompleta"}</p>
      <div style={{ marginTop: "1rem" }}>
        <Link to={`/edit/${task.id}`} className="btn btn-primary">Editar</Link>
        <button onClick={handleDelete} className="btn btn-danger">Eliminar</button>
        <Link to="/" className="btn btn-secondary">Volver</Link>
      </div>
    </div>
  );
}

// La exportación también debe ser "Detalles"
export default Detalles;