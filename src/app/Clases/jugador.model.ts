import { objeto } from "./objeto.model";
import { pokemon } from "./pokemon.model";

export class jugador{

    nombre:string = "";
    pokemons:pokemon[] = [];
    objetos:objeto[] = []

    setNombre(nombre:string){
        this.nombre = nombre;
    }
    
}