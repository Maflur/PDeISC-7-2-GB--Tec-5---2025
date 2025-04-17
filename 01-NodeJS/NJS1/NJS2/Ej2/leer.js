import { readFile } from 'node:fs/promises'
//le pasmos la ruta y lo leeS
export async function mostrarArchivo(ruta)
{
    //aca se leera el archivo 
    try{
        const contenido = await readFile(ruta,'utf-8');
        return contenido;
    } catch (error){//y aca se muestra que no se pudo leer
        console.error("no se leyo el archivo");
    }
}