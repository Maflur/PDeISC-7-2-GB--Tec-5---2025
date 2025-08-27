import { useEffect, useState } from "react";

function App() {
  // Estado para almacenar la lista de usuarios.
  const [usuarios, setUsuarios] = useState([]);
  // Estado para manejar los datos del formulario de creación/edición.
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    apodo: "",
    edad: "",
    fecha_nacimiento: "",
    profesion: "",
  });
  // Estado para saber si estamos en modo edición y qué usuario estamos editando.
  const [editando, setEditando] = useState(null);

  // Función asíncrona para obtener la lista de usuarios desde la API.
  const fetchUsuarios = async () => {
    try {
      const res = await fetch("http://localhost:3000/usuarios");
      const data = await res.json();
      // Asegura que data sea un array, si no, usa un array vacío.
      setUsuarios(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error al obtener los usuarios:", error);
    }
  };

  // Se ejecuta una vez al cargar el componente para obtener los usuarios iniciales.
  useEffect(() => {
    fetchUsuarios();
  }, []);

  // Maneja los cambios en los campos del formulario y actualiza el estado.
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Envía una nueva solicitud de usuario a la API.
  const crearUsuario = async () => {
    try {
      const res = await fetch("http://localhost:127.0.0.1/usuarios", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(form),
  });
      // Restablece el formulario a valores vacíos.
      resetForm();
      // Vuelve a obtener la lista de usuarios para mostrar el nuevo.
      fetchUsuarios();
    } catch (error) {
      console.error("Error al crear el usuario:", error);
    }
  };

  // Envía una solicitud de actualización de usuario a la API.
  const editarUsuario = async () => {
    try {
      await fetch(`http://localhost:3000/usuarios/${editando}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      // Sale del modo de edición.
      setEditando(null);
      // Restablece el formulario.
      resetForm();
      // Vuelve a obtener la lista de usuarios para mostrar los cambios.
      fetchUsuarios();
    } catch (error) {
      console.error("Error al editar el usuario:", error);
    }
  };

  // Envía una solicitud de eliminación a la API.
  const eliminarUsuario = async (id) => {
    try {
      await fetch(`http://localhost:3000/usuarios/${id}`, { method: "DELETE" });
      // Vuelve a obtener la lista de usuarios para mostrar el cambio.
      fetchUsuarios();
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
    }
  };

  // Función para resetear el formulario.
  const resetForm = () => {
    setForm({
      nombre: "",
      apellido: "",
      apodo: "",
      edad: "",
      fecha_nacimiento: "",
      profesion: "",
    });
  };

  // Lógica principal del componente que renderiza el formulario y la tabla.
  return (
    <div className="p-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Gestión de Usuarios
      </h1>
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          {editando ? "Editar Usuario" : "Crear Nuevo Usuario"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
          <input
            className="input w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="nombre"
            placeholder="Nombre"
            value={form.nombre}
            onChange={handleChange}
          />
          <input
            className="input w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="apellido"
            placeholder="Apellido"
            value={form.apellido}
            onChange={handleChange}
          />
          <input
            className="input w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="apodo"
            placeholder="Apodo"
            value={form.apodo}
            onChange={handleChange}
          />
          <input
            className="input w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="number"
            name="edad"
            placeholder="Edad"
            value={form.edad}
            onChange={handleChange}
          />
          <input
            className="input w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="date"
            name="fecha_nacimiento"
            value={form.fecha_nacimiento}
            onChange={handleChange}
          />
          <input
            className="input w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            name="profesion"
            placeholder="Profesión"
            value={form.profesion}
            onChange={handleChange}
          />
        </div>
        <div className="flex gap-2">
          <button
            onClick={editando ? editarUsuario : crearUsuario}
            className="bg-blue-600 text-white px-4 py-2 rounded-md shadow hover:bg-blue-700 transition-colors"
          >
            {editando ? "Guardar Cambios" : "Crear Usuario"}
          </button>
          {editando && (
            <button
              onClick={resetForm}
              className="bg-gray-500 text-white px-4 py-2 rounded-md shadow hover:bg-gray-600 transition-colors"
            >
              Cancelar
            </button>
          )}
        </div>
      </div>

      <h2 className="text-xl font-semibold mt-8 mb-4 text-gray-700">
        Lista de Usuarios
      </h2>
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="table-auto border-collapse w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2 text-left text-gray-600 border-b border-gray-300">ID</th>
              <th className="px-4 py-2 text-left text-gray-600 border-b border-gray-300">Nombre</th>
              <th className="px-4 py-2 text-left text-gray-600 border-b border-gray-300">Apellido</th>
              <th className="px-4 py-2 text-left text-gray-600 border-b border-gray-300">Apodo</th>
              <th className="px-4 py-2 text-left text-gray-600 border-b border-gray-300">Edad</th>
              <th className="px-4 py-2 text-left text-gray-600 border-b border-gray-300">Fecha Nac.</th>
              <th className="px-4 py-2 text-left text-gray-600 border-b border-gray-300">Profesión</th>
              <th className="px-4 py-2 text-left text-gray-600 border-b border-gray-300">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.length > 0 ? (
              usuarios.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50 transition-colors">
                  <td className="border-b border-gray-200 px-4 py-2">{u.id}</td>
                  <td className="border-b border-gray-200 px-4 py-2">{u.nombre}</td>
                  <td className="border-b border-gray-200 px-4 py-2">{u.apellido}</td>
                  <td className="border-b border-gray-200 px-4 py-2">{u.apodo}</td>
                  <td className="border-b border-gray-200 px-4 py-2">{u.edad}</td>
                  <td className="border-b border-gray-200 px-4 py-2">{u.fecha_nacimiento?.slice(0, 10)}</td>
                  <td className="border-b border-gray-200 px-4 py-2">{u.profesion}</td>
                  <td className="border-b border-gray-200 px-4 py-2 flex gap-2">
                    <button
                      onClick={() => {
                        setForm(u);
                        setEditando(u.id);
                      }}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-md shadow hover:bg-yellow-600 transition-colors"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => eliminarUsuario(u.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md shadow hover:bg-red-600 transition-colors"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4 text-gray-500">
                  No hay usuarios para mostrar.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
