import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';

const app = express();
const port = 8081;

// Middlewares
app.use(cors()); 
app.use(express.json());

// Función para conectar a la base de datos
async function connectBD() {
    try {
        const connection = await mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '', 
            database: 'usuarios', 
        });
        console.log('Conexión a la base de datos establecida.');
        return connection;
    } catch (err) {
        console.error('Error de conexión a la base de datos:', err.message);
        return null;
    }
}

// Endpoint para obtener todos los usuarios
app.get('/api/usuarios', async (req, res) => {
    let db;
    try {
        db = await connectBD();
        if (!db) {
            return res.status(500).send('Database connection failed');
        }
        const [rows] = await db.execute('SELECT * FROM usr');
        res.json(rows);
    } catch (error) {
        res.status(500).send(error.message);
    } finally {
        if (db) db.end();
    }
});

// Endpoint para agregar un nuevo usuario
app.post('/api/addUsuario', async (req, res) => {
    let db;
    const { nombre, apellido, direccion, telefono, celular, fecha_nacimiento, email } = req.body;
    try {
        db = await connectBD();
        if (!db) {
            return res.status(500).send('Database connection failed');
        }
        const sql = 'INSERT INTO usr (nombre, apellido, direccion, telefono, celular, fecha_nacimiento, email) VALUES (?, ?, ?, ?, ?, ?, ?)';
        const [result] = await db.execute(sql, [nombre, apellido, direccion, telefono, celular, fecha_nacimiento, email]);
        res.status(201).json({ id: result.insertId, message: 'User added successfully' });
    } catch (error) {
        res.status(500).send(error.message);
    } finally {
        if (db) db.end();
    }
});

// Endpoint para modificar un usuario
app.put('/api/modUsuario/:id', async (req, res) => {
    let db;
    const { id } = req.params;
    const { nombre, apellido, direccion, telefono, celular, fecha_nacimiento, email } = req.body;
    try {
        db = await connectBD();
        if (!db) {
            return res.status(500).send('Database connection failed');
        }
        const sql = 'UPDATE usr SET nombre = ?, apellido = ?, direccion = ?, telefono = ?, celular = ?, fecha_nacimiento = ?, email = ? WHERE id = ?';
        await db.execute(sql, [nombre, apellido, direccion, telefono, celular, fecha_nacimiento, email, id]);
        res.status(200).send('User updated successfully');
    } catch (error) {
        res.status(500).send(error.message);
    } finally {
        if (db) db.end();
    }
});

// Endpoint para eliminar un usuario
app.delete('/api/delUsuario/:id', async (req, res) => {
    let db;
    const { id } = req.params;
    try {
        db = await connectBD();
        if (!db) {
            return res.status(500).send('Database connection failed');
        }
        const sql = 'DELETE FROM usr WHERE id = ?';
        await db.execute(sql, [id]);
        res.status(200).send('User deleted successfully');
    } catch (error) {
        res.status(500).send(error.message);
    } finally {
        if (db) db.end();
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});