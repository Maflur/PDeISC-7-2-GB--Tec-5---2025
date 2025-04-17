import { parse } from "node:url"

//Funcion para devolver el pathname de una url
export function obtenerPath(url)
{
    let q = parse(url, true); //Crea una variable con el parse
    return q.pathname; //Devuelve el pathname de la url
}