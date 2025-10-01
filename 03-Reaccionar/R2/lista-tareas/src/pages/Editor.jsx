import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

// El nombre del componente debe ser "Editor" (con mayúscula)
function Editor({ tasks, setTasks }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const task = tasks.find((t) => t.id === parseInt(id));

  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [completed, setCompleted] = useState(task?.completed || false);

  if (!task) return <p>Tarea no encontrada</p>;

  const validate = () => {
    const startsWithNumber = /^\d/;
    const onlyNumbers = /^\d+$/;
    if (startsWithNumber.test(title) || onlyNumbers.test(title)) {
      alert("El título no puede comenzar con número ni ser solo números.");
      return false;
    }
    if (startsWithNumber.test(description)) {
      alert("La descripción no puede comenzar con número.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const updatedTask = { ...task, title, description, completed };
    setTasks(tasks.map((t) => (t.id === task.id ? updatedTask : t)));
    navigate(`/task/${task.id}`);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h1>Editar Tarea</h1>
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <label>
        <input
          type="checkbox"
          checked={completed}
          onChange={(e) => setCompleted(e.target.checked)}
        />
        ¿Completa?
      </label>
      <button type="submit" className="btn btn-primary">Guardar cambios</button>
    </form>
  );
}

// La exportación también debe ser "Editor"
export default Editor;