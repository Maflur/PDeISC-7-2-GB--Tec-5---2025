//importamos el servidor
import {createServer} from 'node:http';
//importamos el archivo de calculo ,hora y numeroAleatorio
import { suma , resta , multiplicar , dividir} from './calculos.js';
import { hora } from './hora.js';
import { numeroAleatorio } from './aleatorio.js';

//creamos el servidor
const server = createServer((req, res) => {
res.writeHead(200,{'Content-type': 'text/html'});

//muestra el modulo calculo
res.write('<table style="border-top: 1px solid black;border-right: 1px solid black;border-bottom: 1px solid black;border-left: 1px solid black;padding: 10px;"><tr><th>"suma"</th><th>"resta"</th><th>"multiplicacion"</th><th>"divicion"</th></tr> <tr><th>'+(5,4)+'</th> <th>'+(7,4)+'</th> <th>'+(3,5)+'</th> <th>'+(20,4)+'</th> </tr></table> ')
 
//muestra la hora
res.write('<p>esta es la hora de mar del plata: '+hora()+'</p>')

//muestra el numeroAleatorio
res.write('<p>el numero aleatorio del 1 al 100 es: '+numeroAleatorio(1,100)+':</p> ')

res.end('');
});

//inicialisamos el servidor
server.listen(3000, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3000');
})