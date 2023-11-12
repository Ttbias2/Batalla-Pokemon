import { partida } from "./interface-partida";

export interface usuario{
    apellido:string,
    nombre:string,
    password:string,
    email:string,
    historial:partida[],
    id: number
}