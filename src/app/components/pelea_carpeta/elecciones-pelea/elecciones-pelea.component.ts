import { Component, OnInit } from '@angular/core';
import { jugador } from 'src/app/Clases/jugador.model';
import { pokemon } from 'src/app/Clases/pokemon.model';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-elecciones-pelea',
  templateUrl: './elecciones-pelea.component.html',
  styleUrls: ['./elecciones-pelea.component.css']
})

export class EleccionesPeleaComponent implements OnInit{

  j1:jugador;
  j2:jugador;
  pokemonPeleandoj1: number;
  pokemonPeleandoj2: number;
  turno:number;

  constructor(private datUsuario:UsuariosService){
    this.j1=datUsuario.jugador1;
    this.j2=datUsuario.jugador2;
  }

  ngOnInit(): void {
    this.datUsuario.pokemonPeleandoj1$.subscribe(data => this.pokemonPeleandoj1 = data);
    this.datUsuario.pokemonPeleandoj2$.subscribe(data => this.pokemonPeleandoj2 = data);
    this.datUsuario.turnos.subscribe(data => this.turno=data);
  }

  bajarVidaj1(){
    this.j2.pokemons[this.pokemonPeleandoj2].vidaActual -=10;
    this.turno=1;
  };

  bajarVidaj2(){
    this.j1.pokemons[this.pokemonPeleandoj1].vidaActual -=10;
    this.turno = 0;
  };

  cambiarPokemonj1(){
    this.turno = 2
  }

  cambioj1(poke:number){
    this.datUsuario.cambiarPokej1(poke);
    this.turno = 1;
  }

  cambiarPokemonj2(){
    this.turno = 3;
  }

  cambioj2(poke:number){
    this.datUsuario.cambiarPokej2(poke);
    this.turno = 0;
  }
}
