import express from 'express';
import { connectBD } from './conectbd.js';
import cors from 'cors';

const app = express();
const port = 8081;

app.use(cors());
app.use(express.json());

// Get all users
app.get('/api/usuarios', async (req, res) => {
    try {
        const db = await connectBD();
        if (!db) return res.status(500).send('Database connection failed');
        const [rows] = await db.execute('SELECT * FROM usr');
        res.json(rows);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Add a new user
app.post('/addUsuario', async (req, res) => {
    const { nombre, apellido, direccion, telefono, celular, fecha_nacimiento, email } = req.body;
    try {
        const db = await connectBD();
        if (!db) return res.status(500).send('Database connection failed');
        const sql = 'INSERT INTO usr (nombre, apellido, direccion, telefono, celular, fecha_nacimiento, email) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const [result] = await db.execute(sql, [nombre, apellido, direccion, telefono, celular, fecha_nacimiento, email]);
        res.status(201).send({ id: result.insertId, ...req.body });
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Update a user
app.put('/modUsuario/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, apellido, direccion, telefono, celular, fecha_nacimiento, email } = req.body;
    try {
        const db = await connectBD();
        if (!db) return res.status(500).send('Database connection failed');
        const sql = 'UPDATE usr SET nombre = ?, apellido = ?, direccion = ?, telefono = ?, celular = ?, fecha_nacimiento = ?, email = ? WHERE id = ?';
        await db.execute(sql, [nombre, apellido, direccion, telefono, celular, fecha_nacimiento, email, id]);
        res.send('User updated successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

// Delete a user
app.delete('/delUsuario/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const db = await connectBD();
        if (!db) return res.status(500).send('Database connection failed');
        const sql = 'DELETE FROM usr WHERE id = ?';
        await db.execute(sql, [id]);
        res.send('User deleted successfully');
    } catch (error) {
        res.status(500).send(error.message);
    }
});

app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
});