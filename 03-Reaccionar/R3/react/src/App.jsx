import { useEffect, useState } from "react";
import './index.css';

function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    direccion: "",
    telefono: "",
    celular: "",
    fecha_nacimiento: "",
    email: ""
  });
  const [editando, setEditando] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [usuarioAEliminar, setUsuarioAEliminar] = useState(null); 

  const fetchUsuarios = async () => {
    try {
      const res = await fetch("http://localhost:8081/api/usuarios");
      const data = await res.json();
      setUsuarios(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
    }
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validarFormulario = () => {
    const camposRequeridos = ["nombre", "apellido", "direccion", "telefono", "celular", "fecha_nacimiento", "email"];
    for (const campo of camposRequeridos) {
      if (!form[campo]) {
        alert(`Por favor, rellena el campo "${campo}".`);
        return false;
      }
    }

    // Validación de números en los campos de teléfono y celular
    const telefonoRegex = /^[0-9]+$/;

    if (!telefonoRegex.test(form.telefono)) {
      alert("El campo 'Teléfono' solo puede contener números.");
      return false;
    }

    if (!telefonoRegex.test(form.celular)) {
      alert("El campo 'Celular' solo puede contener números.");
      return false;
    }

    return true;
  };

  const crearUsuario = async () => {
    if (!validarFormulario()) {
      return;
    }
    try {
      await fetch("http://localhost:8081/api/addUsuario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      resetForm();
      fetchUsuarios();
    } catch (error) {
      console.error("Error al crear el usuario:", error);
    }
  };

  const editarUsuario = async () => {
    if (!validarFormulario()) {
      return;
    }
    try {
      await fetch(`http://localhost:8081/api/modUsuario/${editando}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setEditando(null);
      resetForm();
      fetchUsuarios();
    } catch (error) {
      console.error("Error al editar el usuario:", error);
    }
  };

  const handleDeleteClick = (id) => {
    setUsuarioAEliminar(id); 
  };

  const confirmarEliminacion = async () => {
    if (usuarioAEliminar) {
      try {
        await fetch(`http://localhost:8081/api/delUsuario/${usuarioAEliminar}`, { method: "DELETE" });
        setUsuarioAEliminar(null); 
        fetchUsuarios();
      } catch (error) {
        console.error("Error al eliminar el usuario:", error);
      }
    }
  };

  const cancelarEliminacion = () => {
    setUsuarioAEliminar(null);
  };

  const resetForm = () => {
    setForm({
      nombre: "",
      apellido: "",
      direccion: "",
      telefono: "",
      celular: "",
      fecha_nacimiento: "",
      email: ""
    });
    setEditando(null);
  };

  const usuariosFiltrados = usuarios.filter(usuario => 
    usuario.nombre.toLowerCase().includes(busqueda.toLowerCase()) || 
    usuario.apellido.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <div className="container">
      <div className="header">
        <h1 className="title">
          Gestión de Usuarios
        </h1>
      </div>
      <div className="section">
        <h2 className="section-title">
          {editando ? "Editar Usuario" : "Crear Nuevo Usuario"}
        </h2>
        <div className="form-grid">
          <input
            className="input-field"
            name="nombre"
            placeholder="Nombre"
            value={form.nombre}
            onChange={handleChange}
          />
          <input
            className="input-field"
            name="apellido"
            placeholder="Apellido"
            value={form.apellido}
            onChange={handleChange}
          />
          <input
            className="input-field"
            name="direccion"
            placeholder="Dirección"
            value={form.direccion}
            onChange={handleChange}
          />
          <input
            className="input-field"
            name="telefono"
            placeholder="Teléfono"
            value={form.telefono}
            onChange={handleChange}
          />
          <input
            className="input-field"
            name="celular"
            placeholder="Celular"
            value={form.celular}
            onChange={handleChange}
          />
          <input
            className="input-field"
            type="date"
            name="fecha_nacimiento"
            value={form.fecha_nacimiento?.slice(0, 10)}
            onChange={handleChange}
          />
          <input
            className="input-field"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />
        </div>
        <div className="button-group">
          <button
            onClick={editando ? editarUsuario : crearUsuario}
            className="button button-primary"
          >
            {editando ? "Guardar Cambios" : "Crear Usuario"}
          </button>
          {editando && (
            <button
              onClick={resetForm}
              className="button button-secondary"
            >
              Cancelar
            </button>
          )}
        </div>
      </div>

      <h2 className="section-title">
        Lista de Usuarios
      </h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Buscar por nombre o apellido..."
          className="input-field input-search"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>
      <div className="table-container">
        <table className="user-table">
          <thead className="table-header">
            <tr>
              <th className="table-header-cell">ID</th>
              <th className="table-header-cell">Nombre</th>
              <th className="table-header-cell">Apellido</th>
              <th className="table-header-cell">Dirección</th>
              <th className="table-header-cell">Teléfono</th>
              <th className="table-header-cell">Celular</th>
              <th className="table-header-cell">Fecha Nac.</th>
              <th className="table-header-cell">Email</th>
              <th className="table-header-cell">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuariosFiltrados.length > 0 ? (
              usuariosFiltrados.map((u) => (
                <tr key={u.id} className="table-row">
                  <td className="table-cell">{u.id}</td>
                  <td className="table-cell">{u.nombre}</td>
                  <td className="table-cell">{u.apellido}</td>
                  <td className="table-cell">{u.direccion}</td>
                  <td className="table-cell">{u.telefono}</td>
                  <td className="table-cell">{u.celular}</td>
                  <td className="table-cell">{u.fecha_nacimiento?.slice(0, 10)}</td>
                  <td className="table-cell">{u.email}</td>
                  <td className="table-cell actions-cell">
                    <button
                      onClick={() => {
                        setForm(u);
                        setEditando(u.id);
                      }}
                      className="button button-edit"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteClick(u.id)}
                      className="button button-delete"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="empty-row">
                  No hay usuarios para mostrar.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {usuarioAEliminar && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="modal-title">Confirmar Eliminación</h3>
            <p>¿Estás seguro de que quieres eliminar este usuario?</p>
            <div className="modal-buttons">
              <button
                onClick={cancelarEliminacion}
                className="button button-secondary"
              >
                Cancelar
              </button>
              <button
                onClick={confirmarEliminacion}
                className="button button-delete"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;