import { Component, OnInit } from '@angular/core';
import { jugador } from 'src/app/Clases/jugador.model';
import { pokemon } from 'src/app/Clases/pokemon.model';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-elecciones-pelea',
  templateUrl: './elecciones-pelea.component.html',
  styleUrls: ['./elecciones-pelea.component.css']
})

export class EleccionesPeleaComponent implements OnInit {

  //variables para jugadores
  j1: jugador;
  j2: jugador;
  pokemonPeleandoj1: number;
  pokemonPeleandoj2: number;
  turno: boolean = true;

  //variables para cambio
  pokePeleandoCambio:number;
  pokesParaCambio: pokemon[] = [];
  cambioPokemon: boolean = false;

  //variables para objetos
  usoObjeto: boolean = false;
  vidaUsadaj1:boolean = false;
  vidaUsadaj2:boolean = false;
  velocidadUsadaj1:boolean = false;
  velocidadUsadaj2:boolean = false;
  efectosUsadaj1:boolean = false;
  efectosUsadaj2:boolean = false;
  ataqueUsadaj1:boolean = false;
  ataqueUsadaj2:boolean = false;

  constructor(private datUsuario: UsuariosService) {
    this.j1 = datUsuario.jugador1;
    this.j2 = datUsuario.jugador2;
  }

  ngOnInit(): void {
    this.datUsuario.pokemonPeleandoj1$.subscribe(data => this.pokemonPeleandoj1 = data);
    this.datUsuario.pokemonPeleandoj2$.subscribe(data => this.pokemonPeleandoj2 = data);
  }

  bajarVida() {
    this.usoObjeto = false;
    this.cambioPokemon = false;

    if (this.turno) {
      this.j2.pokemons[this.pokemonPeleandoj2].vidaActual -= 10;
      this.turno = false;
    }
    else {
      this.j1.pokemons[this.pokemonPeleandoj1].vidaActual -= 10;
      this.turno = true;
    }

  };

  //cambios de pokemon
  cambiarPokemon() {
    this.usoObjeto = false;
    if(this.turno)
    {
      this.pokePeleandoCambio = this.pokemonPeleandoj1;
      this.pokesParaCambio = this.j1.pokemons;
    }
    else{
      this.pokePeleandoCambio = this.pokemonPeleandoj2;
      this.pokesParaCambio = this.j2.pokemons;
    }
    this.cambioPokemon = true;
  }

  cambioj1(poke: number) {
    if(this.turno){
      this.datUsuario.cambiarPokej1(poke);
      this.turno = false;
    }
    else{
      this.datUsuario.cambiarPokej2(poke);
      this.turno = true;
    }
    this.cambioPokemon = false;
    
  }

  //uso de objetos
  usarObjeto() {
    this.cambioPokemon = false;
    this.usoObjeto = true;
  }

  usoPocionVida() {
    if (this.turno) {
      if(!this.vidaUsadaj1)
      {
        if ((this.j1.pokemons[this.pokemonPeleandoj1].vidaActual += 20) > this.j1.pokemons[this.pokemonPeleandoj1].vida) {
          this.j1.pokemons[this.pokemonPeleandoj1].vidaActual = this.j1.pokemons[this.pokemonPeleandoj1].vida;
        }
        else {
          this.j1.pokemons[this.pokemonPeleandoj1].vida;
        }
        this.turno = false;
        this.vidaUsadaj1 = true;
      }
      else{
        alert("ya uso esa pocion, elija otra accion");
      }
    }
    else {
      if(!this.vidaUsadaj2)
      {
        if ((this.j2.pokemons[this.pokemonPeleandoj2].vidaActual += 20) > this.j2.pokemons[this.pokemonPeleandoj2].vida) {
          this.j2.pokemons[this.pokemonPeleandoj2].vidaActual = this.j2.pokemons[this.pokemonPeleandoj2].vida;
        }
        else {
          this.j2.pokemons[this.pokemonPeleandoj2].vida;
        }  
        this.vidaUsadaj2 = true;
        this.turno = true;
      }
      else{
        alert("ya uso esa pocion, elija otra accion");
      }
      
    }

    this.usoObjeto = false;
  }

  usoPocionVelocidad(){

  }

  usoQuitarEfecto(){

  }

  usoPocionAtaque(){

  }
}
