// Importo el modulo http y los modulos correspondientes del ejercicio
import { createServer } from 'node:http';
import { obtenerHost } from './host.js';
import { obtenerPath } from './paht.js';
import { obtenerSearch } from './buscarUrl.js';

//Creo el servidor con http
const server = createServer(async (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });

  try//Intento imprimir el host
  {
    res.write('<p> Host: ' + obtenerHost(req.url) + '</p>'); //Imprimo el host como un parrafo
  } catch(error)
  {
    res.write("<p>No se puede imprimir el Host </p>"); //En caso de no poder imprimirlo
  }

  //Imprimo el path
  res.write('<p> Path: ' + obtenerPath(req.url) + '</p>'); 

  try//Intento imprimir la busqueda
  {
    res.write('<p> Search: ' + obtenerSearch(req.url) + '</p>'); //Imprimo la busqueda
  } catch(error)
  {
    res.write("<p>No se puede imprimir la busqueda </p>");//En caso de no poder imprimirlo
  }
  //Termino el documento
  res.end();
});

// starts a simple http server locally on port 8081
server.listen(8081, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:8081');
});