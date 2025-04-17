//importamos el servidor
import {createServer} from 'node:http';
//creamos el servidor
const server = createServer((req, res) => {
res.writeHead(200,{'Content-type': 'text/html'});
//titulo de la pagina
res.write(' <p style="color: blueviolet; font-size: 50px;">titulo</p>')
//
res.end('');
});
//inicialisamos el servidor
server.listen(3000, '127.0.0.1', () => {
    console.log('Listening on 127.0.0.1:3000');
})