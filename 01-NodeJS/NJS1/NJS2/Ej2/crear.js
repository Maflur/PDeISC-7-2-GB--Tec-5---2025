import { writeFile } from 'node:fs/promises'
//se envia el parametro la ruta el contenido para el archivo si el archivo no existe lo va a crear
//si el archivo ya existe lo sobre escribe
export async function writeToFile(filenName, date)
{
    try{
        await writeFile(filenName,date);
    } catch (error){

        console.error(`error: ${error.message}`);
    }
}