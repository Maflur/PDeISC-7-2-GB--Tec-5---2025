import React, { useEffect, useState } from "react";
import { Zoom, Slide, Bounce } from "react-awesome-reveal";
import "./App.css";

export default function App() {
  const [showHeader, setShowHeader] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  // Modal edición
  const [editModal, setEditModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDesc, setEditDesc] = useState("");
  const [editImg, setEditImg] = useState("");

  // Datos dinámicos
  const [name, setName] = useState("Mafúr");
  const [description, setDescription] = useState(
    "Estudiante de Ingeniería Informática y desarrollador web"
  );

  const [projects, setProjects] = useState([
    {
      img: "/ex1.jpg",
      title: "Proyecto 1",
      desc: "Proyecto enfocado en desarrollo web con React y Node.js.",
    },
    {
      img: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800",
      title: "Proyecto 2",
      desc: "Aplicación móvil multiplataforma usando Flutter.",
    },
    {
      img: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800",
      title: "Proyecto 3",
      desc: "Sistema de gestión empresarial basado en Java.",
    },
    {
      img: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800",
      title: "Proyecto 4",
      desc: "Página de portfolio personal con animaciones.",
    },
  ]);

  const [highlights, setHighlights] = useState([
    {
      img: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800",
      title: "Experiencia 1",
      desc: "Texto sobre esta experiencia o habilidad destacada.",
      reverse: false,
    },
    {
      img: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800",
      title: "Experiencia 2",
      desc: "Texto sobre esta experiencia o habilidad destacada.",
      reverse: true,
    },
    {
      img: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800",
      title: "Experiencia 3",
      desc: "Texto sobre esta experiencia o habilidad destacada.",
      reverse: false,
    },
  ]);

  useEffect(() => {
    const handleScroll = () => setShowHeader(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Abrir modal de edición
  const handleEdit = (item, type) => {
    setEditItem({ ...item, type });
    setEditTitle(item.title || "");
    setEditDesc(item.desc || "");
    setEditImg(item.img || "");
    setEditModal(true);
  };

  // Guardar cambios
  const saveChanges = () => {
    if (editItem.type === "project") {
      setProjects((prev) =>
        prev.map((p) =>
          p.title === editItem.title
            ? { title: editTitle, desc: editDesc, img: editImg }
            : p
        )
      );
    } else if (editItem.type === "highlight") {
      setHighlights((prev) =>
        prev.map((h) =>
          h.title === editItem.title
            ? { ...h, title: editTitle, desc: editDesc, img: editImg }
            : h
        )
      );
    } else if (editItem.type === "intro") {
      setName(editTitle);
      setDescription(editDesc);
    }
    setEditModal(false);
  };

  // Eliminar proyecto
  const deleteProject = (title) => {
    setProjects((prev) => prev.filter((p) => p.title !== title));
  };

  // Agregar proyecto
  const addProject = () => {
    setProjects((prev) => [
      ...prev,
      {
        img: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800",
        title: `Proyecto ${prev.length + 1}`,
        desc: "Descripción del nuevo proyecto.",
      },
    ]);
  };

  // Eliminar experiencia
  const deleteHighlight = (title) => {
    setHighlights((prev) => prev.filter((h) => h.title !== title));
  };

  // Agregar experiencia
  const addHighlight = () => {
    setHighlights((prev) => [
      ...prev,
      {
        img: "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800",
        title: `Experiencia ${prev.length + 1}`,
        desc: "Texto sobre esta experiencia o habilidad destacada.",
        reverse: prev.length % 2 === 0,
      },
    ]);
  };

  return (
    <div className="App">
      {/* HEADER */}
      <header className={`header ${showHeader ? "visible" : ""}`}>
        <div className="header-left">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="top-button"
          >
            ↑
          </button>
        </div>
        <div className="header-center">developer web</div>
        <div className="header-right">
          <a href="#instagram">Instagram</a>
          <a href="#linkedin">LinkedIn</a>
          <a href="#contacto">Contacto</a>
          {!isLogged && (
            <a onClick={() => setShowLogin(true)} style={{ cursor: "pointer" }}>
              Iniciar sesión
            </a>
          )}
          {isLogged && (
            <a onClick={() => setIsLogged(false)} style={{ cursor: "pointer" }}>
              Cerrar sesión
            </a>
          )}
        </div>
      </header>

      {/* MODAL LOGIN */}
      {showLogin && (
        <div className="login-overlay">
          <div className="login-modal">
            <span className="close-btn" onClick={() => setShowLogin(false)}>
              ✖
            </span>
            <h2 style={{ color: "var(--primary)" }}>Iniciar Sesión</h2>
            {error && (
              <Bounce>
                <p style={{ color: "red" }}>Usuario o contraseña incorrectos</p>
              </Bounce>
            )}
            <input
              type="text"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={async () => {
                try {
                  const res = await fetch("http://localhost:3001/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ nombre: username, contrasenia: password }),
                  });
                  const data = await res.json();
                  if (data.success) {
                    setIsLogged(true);
                    setShowLogin(false);
                    setError(false);
                  } else {
                    setError(true);
                  }
                } catch (err) {
                  console.error(err);
                  setError(true);
                }
              }}
            >
              Ingresar
            </button>
          </div>
        </div>
      )}

      {/* MODAL EDICIÓN */}
      {editModal && (
        <div className="login-overlay">
          <div className="login-modal">
            <span className="close-btn" onClick={() => setEditModal(false)}>
              ✖
            </span>
            <h2 style={{ color: "var(--primary)" }}>Editar</h2>
            <input
              placeholder="Título"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
            />
            <input
              placeholder="Descripción"
              value={editDesc}
              onChange={(e) => setEditDesc(e.target.value)}
            />
            {editItem.type !== "intro" && (
              <input
                placeholder="URL Imagen"
                value={editImg}
                onChange={(e) => setEditImg(e.target.value)}
              />
            )}
            <button onClick={saveChanges}>Guardar</button>
          </div>
        </div>
      )}

      {/* SECCIÓN YO */}
      <section className="yo">
        <div className="yo-content">
          <h1 className="name">{name}</h1>
          <p className="description">{description}</p>
          {isLogged && (
            <button
              className="edit-btn"
              onClick={() =>
                handleEdit({ title: name, desc: description }, "intro")
              }
            >
              Editar Intro
            </button>
          )}
        </div>
      </section>

      {/* PROYECTOS */}
      <section className="projects">
        <h2>Mis Proyectos</h2>
        <div className="project-grid">
          {projects.map((p, i) => (
            <Zoom key={i} triggerOnce>
              <div className="project-card">
                <div className="project-img-container">
                  <img src={p.img} alt={p.title} />
                </div>
                <h3>{p.title}</h3>
                <p>{p.desc}</p>
                {isLogged && (
                  <>
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(p, "project")}
                    >
                      Editar
                    </button>
                    <button
                      className="edit-btn"
                      style={{ background: "red" }}
                      onClick={() => deleteProject(p.title)}
                    >
                      Eliminar
                    </button>
                  </>
                )}
              </div>
            </Zoom>
          ))}
        </div>
        {isLogged && (
          <div style={{ marginTop: "20px" }}>
            <button className="edit-btn" onClick={addProject}>
              Agregar Proyecto
            </button>
          </div>
        )}
      </section>

      {/* EXPERIENCIAS */}
      <section className="highlights">
        {highlights.map((h, i) => (
          <Slide key={i} direction={h.reverse ? "right" : "left"} triggerOnce>
            <div className={`highlight ${h.reverse ? "reverse" : ""}`}>
              <img src={h.img} alt={h.title} />
              <div className="highlight-text">
                <h3>{h.title}</h3>
                <p>{h.desc}</p>
                {isLogged && (
                  <>
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(h, "highlight")}
                    >
                      Editar
                    </button>
                    <button
                      className="edit-btn"
                      style={{ background: "red" }}
                      onClick={() => deleteHighlight(h.title)}
                    >
                      Eliminar
                    </button>
                  </>
                )}
              </div>
            </div>
          </Slide>
        ))}
        {isLogged && (
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <button className="edit-btn" onClick={addHighlight}>
              Agregar Experiencia
            </button>
          </div>
        )}
      </section>
    </div>
  );
}