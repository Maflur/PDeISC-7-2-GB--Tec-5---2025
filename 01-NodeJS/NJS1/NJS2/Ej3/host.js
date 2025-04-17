import { parse } from "node:url"

//Funcion para devolver el host de una url
export function obtenerHost(url)
{
    let q = parse(url, true); //Crea una variable con el parse
    return q.host; //Devuelve el host de la url
}