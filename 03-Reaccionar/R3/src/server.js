//Imports
import express from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import {connectBD} from './conectbd.js';
import cors from 'cors';

const app = express();
const port = 8081; //Puerto asignado
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(cors()); 
app.use(express.static(join(__dirname, 'public')));
app.use(express.json());


async function getRows() 
{
    const db = await connectBD();
    if(!db) return;

    const [rows] = await db.execute('SELECT * FROM usuarios');
    return rows;
};

//Permite insertar un nuevo usuario
async function insertInto(nombre, apellido, direccion, telefono, fecha_nacimiento, email) 
{
    let db;
    try
    {
        db = await connectBD();
        if(!db) return;
        const sql = 'INSERT INTO usuarios (nombre, apellido, direccion, telefono, fecha_nacimiento, email) VALUES (?, ?, ?, ? ,?, ?)';
        const [result] = await db.execute(sql, [nombre, apellido, direccion, telefono, fecha_nacimiento, email]);
        console.log(result.affectedRows);
        return result;
    } catch(error)
    {
        console.error(error);
    }
};


async function updateUser(id, nombre, apellido, direccion, telefono, fecha_nacimiento, email) 
{
    let db;
    try
    {
        db = await connectBD();
        if(!db) return;
        const sql = 'UPDATE usuarios SET nombre = ?, apellido = ?, direccion = ?, telefono = ?, fecha_nacimiento = ?, email = ? WHERE id  = ?';
        const [result] = await db.execute(sql, [nombre, apellido, direccion, telefono, fecha_nacimiento, email, parseInt(id)]);
        console.log(result.affectedRows);
        return result;
    } catch(error)
    {
        console.error(error);
    }
};


async function deleteUser(id) 
{
    let db;
    try
    {
        db = await connectBD();
        if(!db) return;
        const sql = 'DELETE FROM usuarios WHERE id  = ?';
        const [result] = await db.execute(sql, [parseInt(id)]);
        console.log(result.affectedRows);
        return result;
    } catch(error)
    {
        console.error(error);
    }
};

app.get('/', (req, res) => {
   
    res.sendFile(join(__dirname, 'public', 'index.html'));
});


app.post('/addUsuario', async function(req,res){
    const { nombre, apellido, direccion, telefono, fecha_nacimiento, email } = req.body;
     await insertInto(nombre, apellido, direccion, telefono, fecha_nacimiento, email)
    .then(async result => {
        res.send(result);
    })
    .catch(err => res.status(500).send(err));
});

app.post('/modUsuario', async function(req,res){
    const { id, nombre, apellido, direccion, telefono, fecha_nacimiento, email } = req.body; //Valores del usuario
    await updateUser(id, nombre, apellido, direccion, telefono, fecha_nacimiento, email)
    .then(async result => {
        res.send(result);
    })
    .catch(err => res.status(500).send(err));
});

app.post('/delUsuario', async function(req,res){
    const { id } = req.body; 
    await deleteUser(id)
    .then(async result => {
        res.send(result);
    })
    .catch(err => res.status(500).send(err));
});


app.get('/api/usuarios', async (req, res) => {
    let usu = await getRows();
    res.json(usu);
});


app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});