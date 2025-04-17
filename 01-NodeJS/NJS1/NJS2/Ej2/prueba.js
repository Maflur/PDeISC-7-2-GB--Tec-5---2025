//importamos el servidor
import {createServer} from 'node:http';
//aca importamos las funciones 
import {writeToFile} from './crear.js';
import {mostrarArchivo} from './leer.js';

//aca de escribe el html con un titulo
writeToFile('prueba.html', '<h1>si funca :D</h1>');

//creamos el servidor
const server = createServer(async (req, res) => {
res.writeHead(200,{'Content-type': 'text/html'});
//aca se espera que el archivo sea leeido 
try{
    const contenido = await mostrarArchivo('prueba.html');
    res.write(contenido.toString());
} catch (error){
    res.write('<h1>error al cargar el archivo</h1>');
}

res.end('');
});

//inicialisamos el servidor
server.listen(3000, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3000');
})