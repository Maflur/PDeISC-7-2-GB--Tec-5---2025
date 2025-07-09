import express from 'express';
import axios from 'axios';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 8081;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Función para obtener datos desde una URL
async function leerUrl(url) {
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        throw error;
    }
}

app.use(express.static(join(__dirname, 'public')));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'public', 'index.html'));
});

// Puntos individuales
app.get('/c1', (req, res) => {
    res.sendFile(join(__dirname, 'public', 'punto-1', 'index.html'));
});
app.get('/c2', (req, res) => {
    res.sendFile(join(__dirname, 'public', 'punto-2', 'index.html'));
});
app.get('/c3', (req, res) => {
    res.sendFile(join(__dirname, 'public', 'punto-3', 'index.html'));
});
app.get('/c4', (req, res) => {
    res.sendFile(join(__dirname, 'public', 'punto-4', 'index.html'));
});

// Ruta para procesar solicitud de datos desde el cliente
app.post('/obtenerData', (req, res) => {
    const { ruta } = req.body;
    leerUrl(ruta)
        .then(data => res.send(data))
        .catch(error => res.status(500).send(error));
});

// Ruta para agregar usuarios simulada
let usuarios = [];
app.post('/addUsuario', (req, res) => {
    const { nombre, email } = req.body;
    const usuario = {
        id: usuarios.length,
        name: nombre,
        email: email
    };
    usuarios.push(usuario);
    res.send(usuarios.length - 1);
});

// Ruta para obtener usuarios
app.get('/api/usuarios', (req, res) => {
    res.json(usuarios);
});

// Iniciar servidor
app.listen(port, '127.0.0.1', () => {
    console.log('Servidor corriendo en http://127.0.0.1:' + port);
});