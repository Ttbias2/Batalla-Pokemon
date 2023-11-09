import { Injectable } from '@angular/core';
import { jugador } from './Clases/jugador.model';
import { pokemon } from './Clases/pokemon.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  jugador1: jugador = new jugador();
  jugador2: jugador = new jugador();
  pasos: number = 1;
  private pokemonPeleandoj1 = new BehaviorSubject<number>(0);
  pokemonPeleandoj1$ = this.pokemonPeleandoj1.asObservable();
  private pokemonPeleandoj2 = new BehaviorSubject<number>(0);
  pokemonPeleandoj2$ = this.pokemonPeleandoj2.asObservable();

  constructor() {
    this.jugador1.setNombre("Tobias");
    this.jugador2.setNombre("Arturo");
  }

  asignarPokemon(nuevoPokemon: any) {

    let poke: pokemon = new pokemon(
      nuevoPokemon.name,
      nuevoPokemon.sprites.front_default,
      nuevoPokemon.sprites.back_default,
      nuevoPokemon.id,
      nuevoPokemon.stats[0].base_stat,
      nuevoPokemon.stats[1].base_stat,
      nuevoPokemon.stats[2].base_stat,
      nuevoPokemon.stats[3].base_stat,
      nuevoPokemon.stats[4].base_stat,
      nuevoPokemon.stats[5].base_stat,
      nuevoPokemon.stats[0].base_stat
    );

    switch (this.pasos) {
      case 1:
        this.jugador1.pokemons.push(poke);
        break;

      case 2:
        this.jugador2.pokemons.push(poke);
        break;

      case 3:
        this.jugador2.pokemons.push(poke);
        break;

      case 4:
        this.jugador1.pokemons.push(poke);
        break;

      case 5:
        this.jugador1.pokemons.push(poke);
        break;

      case 6:
        this.jugador2.pokemons.push(poke);
        break;
      default:
        break;
    }

    if(this.pasos==7)
    {
      alert("todos los pokemons seleccionados");
    }
    else{
      this.pasos++;
    }

  }

  setNombres(nombreUs1: string, nombreUs2: string) {

    this.jugador1.setNombre(nombreUs1);
    this.jugador2.setNombre(nombreUs2);

  }

  cambiarPokej1(poke: number) {
    this.pokemonPeleandoj1.next(poke);
  }

  cambiarPokej2(poke:number){
    this.pokemonPeleandoj2.next(poke);
}



}
