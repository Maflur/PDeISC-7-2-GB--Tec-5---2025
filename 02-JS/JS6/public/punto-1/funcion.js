let ruta = 'https://jsonplaceholder.typicode.com/users?authuser=0';

fetch('/obtenerData', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ruta })
})
.then(response => response.json())
.then(data => {
    data.forEach(persona => {
        document.getElementById('cuerpo').innerHTML += `<li>${persona.name}, ${persona.email}</li>`;
    });
});