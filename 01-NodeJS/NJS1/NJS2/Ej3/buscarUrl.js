import { parse } from "node:url"

//Funcion para devolver la busqueda de una url
export function obtenerSearch(url)
{
    let q = parse(url, true); 
    return q.search; 
}