document.getElementById('boton').addEventListener('click', buscar);
document.addEventListener('keydown', teclas);

//Para poder buscar presionando el ENTER
function teclas(event)
{
    if(event.keyCode === 13) //ENTER
    {
        buscar();
    }
}

function buscar()
{
    //Se determina el valor del campo de busqueda y de la ruta
    let busqueda = document.getElementById('busqueda').value;
    let ruta = 'https://jsonplaceholder.typicode.com/users?authuser=0';
    //Se obtienen los datos de la API
    fetch('/obtenerData',{
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ruta })
    })
    .then(response => response.json())
    .then(data => {
        //Se limpia el campo de resultados
        document.getElementById('resultados').innerHTML = '';
        data.map(persona =>
        {
            //Se busca cuales opciones coinciden con la busqueda
            if(persona.name.toLowerCase().includes(busqueda.toLowerCase()))
            {
                document.getElementById('resultados').innerHTML += `<li> ${persona.name}</li>`;
            }
        });
    });
}