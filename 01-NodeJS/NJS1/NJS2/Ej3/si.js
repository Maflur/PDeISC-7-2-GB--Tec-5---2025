// urlComponent.js
const url = require('url');

function mostrarInfoUrl(inputUrl) {
  const parsedUrl = url.parse(inputUrl);

  console.log("Protocolo:", parsedUrl.protocol);
  console.log("Host:", parsedUrl.host);
  console.log("Hostname:", parsedUrl.hostname);
  console.log("Puerto:", parsedUrl.port);
  console.log("Path:", parsedUrl.path);
  console.log("Pathname:", parsedUrl.pathname);
  console.log("Query:", parsedUrl.query);
}

// Ejemplo de uso
mostrarInfoUrl('https://ejemplo.com:8080/ruta/pagina?nombre=juan&id=123');
