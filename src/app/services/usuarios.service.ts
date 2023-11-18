import { Injectable } from '@angular/core';

import { jugador } from './../Clases/jugador.model';
import { pokemon } from './../Clases/pokemon.model';
import { BehaviorSubject } from 'rxjs';
import { HabilidadesService } from './habilidades.service';
import { habilidad } from '../Clases/habilidad.model';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  jugador1: jugador = new jugador();
  jugador2: jugador = new jugador();

  private pasos = new BehaviorSubject<number>(1);
  pasos$ = this.pasos.asObservable();

  private pokemonPeleandoj1 = new BehaviorSubject<number>(0);
  pokemonPeleandoj1$ = this.pokemonPeleandoj1.asObservable();

  private pokemonPeleandoj2 = new BehaviorSubject<number>(0);
  pokemonPeleandoj2$ = this.pokemonPeleandoj2.asObservable();

  private porcentajeVidaJ1 = new BehaviorSubject<number>(100);
  porcentajeVidaJ1$ = this.porcentajeVidaJ1.asObservable();


  private porcentajeVidaJ2 = new BehaviorSubject<number>(100);
  porcentajeVidaJ2$ = this.porcentajeVidaJ2.asObservable();

  constructor(private datHabilidades: HabilidadesService) { }

  asignarPokemon(nuevoPokemon: any) {

    this.datHabilidades.habilidadesTipo = [];

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

    nuevoPokemon.types.forEach((tipo: any) => {

      poke.tipo.push(tipo.type.name);

      if (tipo.type.name != "normal") {
        this.datHabilidades.llenarPorHabilidad(tipo.type.name).subscribe(() => this.datHabilidades.habilidadesTipo.forEach
          (ataque => {
            poke.habilidades.push(ataque);
          }))
      }
    })

    if (poke.habilidades.length < 4) {
      setTimeout(() => {
        this.datHabilidades.llenarPorHabilidad("normal").subscribe(() => this.datHabilidades.habilidadesTipo.forEach
          (ataque => {
            if (poke.habilidades.length < 4) {

              console.log("asdadsasd");//el coco
              poke.habilidades.push(ataque);

            }
          }))
      }, 1000); // 1000 milliseconds = 1 second
    }

    switch (this.pasos.getValue()) {
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

    if (this.pasos.getValue() == 7) {
      alert("todos los pokemons seleccionados");
    }
    else {
      this.pasos.next(this.pasos.getValue() + 1);
    }

  }

  setNombres(nombreUs1: string, nombreUs2: string) {

    this.jugador1.setNombre(nombreUs1);
    this.jugador2.setNombre(nombreUs2);

  }

  cambiarPokej1(poke: number) {
    this.pokemonPeleandoj1.next(poke);
  }

  cambiarPokej2(poke: number) {
    this.pokemonPeleandoj2.next(poke);
  }

  calcularPorcentajeVidaJ1(pokePeleando: number) {
    let porcentaje = Math.round((this.jugador1.pokemons[pokePeleando].vidaActual / this.jugador1.pokemons[pokePeleando].vida) * 100);

    if (this.jugador1.pokemons[pokePeleando].vidaActual <= 0) {
      porcentaje = 0;
    }

    this.porcentajeVidaJ1.next(porcentaje);
  }

  calcularPorcentajeVidaJ2(pokePeleando: number) {
    let porcentaje = Math.round((this.jugador2.pokemons[pokePeleando].vidaActual / this.jugador2.pokemons[pokePeleando].vida) * 100);


    if (this.jugador2.pokemons[pokePeleando].vidaActual <= 0) {
      porcentaje = 0;
    }


    this.porcentajeVidaJ2.next(porcentaje);
  }

  reiniciarPasos(){
    this.pasos.next(1);
  }

}

