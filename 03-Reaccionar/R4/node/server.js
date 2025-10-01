// server.js
import express from "express";
import cors from "cors";
import { pool } from "./bs.js";

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Ruta de login
app.post("/login", async (req, res) => {
  const { nombre, contrasenia } = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM inicio WHERE nombre = $1 AND contrasenia = $2",
      [nombre, contrasenia]
    );

    if (result.rows.length > 0) {
      res.json({ success: true, message: "Login exitoso" });
    } else {
      res.json({ success: false, message: "Usuario o contraseña incorrectos" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error del servidor" });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
