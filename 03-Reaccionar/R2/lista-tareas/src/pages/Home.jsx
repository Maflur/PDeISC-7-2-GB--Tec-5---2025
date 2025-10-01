import { Link } from "react-router-dom";
import TaskCard from "../components/TaskCard";

function Home({ tasks }) {
  const incompletas = tasks.filter((t) => !t.completed);
  const completas = tasks.filter((t) => t.completed);

  return (
    <div>
      <div className="section">
        <h2>Tareas Incompletas</h2>
        <div className="tasks-box">
          {incompletas.length === 0 && <p>No hay tareas incompletas </p>}
          {incompletas.map((task) => (
            <Link key={task.id} to={`/task/${task.id}`} style={{ textDecoration: "none" }}>
              <TaskCard task={task} />
            </Link>
          ))}
        </div>
      </div>

      <div className="section">
        <h2>Tareas Completas</h2>
        <div className="tasks-box">
          {completas.length === 0 && <p>No hay tareas completas aún.</p>}
          {completas.map((task) => (
            <Link key={task.id} to={`/task/${task.id}`} style={{ textDecoration: "none" }}>
              <TaskCard task={task} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
