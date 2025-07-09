document.getElementById('formulario').addEventListener('submit', enviar);

function enviar(event)
{
    event.preventDefault();
    //Se limpian las etiquetas
    document.getElementById('error').innerHTML = '';
    document.getElementById('ok').innerHTML = '';
    //Se guardan las variables
    let nombre = document.getElementById('nombre').value;
    let email = document.getElementById('email').value;
    let valido = true;

    //Se verifician las variables
    if(verificarText(nombre))
    {
        valido = false;
        document.getElementById('error').innerHTML = 'ERROR: Nombre invalido';
    }
    if(!verificarEmail(email))
    {
        valido = false;
        document.getElementById('error').innerHTML = 'ERROR: Email invalido';
    }
    if(nombre == '' || email == '')
    {
        valido = false;
        document.getElementById('error').innerHTML = 'ERROR: Llenar todos los campos';
    }
    if(valido)
    {
        //Si todo es valido se trata de agregar al usuario
        fetch('/addUsuario',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ nombre , email })
        })
        .then(response => response.text())
        .then(data => {
            //Se muestra la ID por pantalla
            document.getElementById('ok').innerHTML = 'ENVIADO: Id ' + data;
        });
    }
}

function verificarText(s)
{
    //Revisa cada caracter para asegurarse que entre en el estandar
    //En caso de no estar en el estandar devuelve true
    for(let i=0; i<s.length; i++)
    {
        if(!/[a-zA-Z]/.test(s[i]) && s[i] !== 'ñ' && s[i] !== ' ') return true;
    }
    return false;
}

function verificarEmail(email)
{
    //Utiliza un regex para verificar que el email cumpla con los requisitos
    let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    return emailRegex.test(email)
}