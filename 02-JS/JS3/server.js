const express = require("express");
const app= express();
const path= require ("path");
//le estamos indicando a que app use la carpeta public
app.use(express.static(path.join(__dirname, 'public')));
//creamos el server
app.get ('/', (req, res) => {
res.sendFile(path.join(__dirname, 'public','index.html'));
});




app.listen(8081, '127.0.0.1', () => {
    console.log('Listening on 127.0.0.1:8081');
});