
import { pokemon } from "./pokemon.model";

export class jugador{

    nombre:string = "";
    pokemons:pokemon[] = [];

    setNombre(nombre:string){
        this.nombre = nombre;
    }
    
}