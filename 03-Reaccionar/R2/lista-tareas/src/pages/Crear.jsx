import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Crear({ tasks, setTasks }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  const navigate = useNavigate();

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
    const newTask = {
      id: tasks.length + 1,
      title,
      description,
      date: new Date().toISOString().split("T")[0],
      completed,
    };
    setTasks([...tasks, newTask]);
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <h1>Nueva Tarea</h1>
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
      <button type="submit" className="btn btn-primary">Guardar</button>
    </form>
  );
}

export default Crear;