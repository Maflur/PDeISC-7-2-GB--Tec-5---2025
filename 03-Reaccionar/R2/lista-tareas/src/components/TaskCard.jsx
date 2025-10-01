function TaskCard({ task }) {
    return (
      <div className="card">
        <h3>{task.title}</h3>
        <p>{task.description.slice(0, 40)}...</p>
        <p>{task.completed ? " Completa" : " Incompleta"}</p>
      </div>
    );
  }
  
  export default TaskCard;
  