import { Component, OnInit } from '@angular/core';
import { jugador } from 'src/app/Clases/jugador.model';
import { UsuariosService } from 'src/app/usuarios.service';

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

  constructor(private datUsuario:UsuariosService){
    this.j1=datUsuario.jugador1;
    this.j2=datUsuario.jugador2;
  }
  ngOnInit(): void {
    this.datUsuario.pokemonPeleandoj1$.subscribe(data => this.pokemonPeleandoj1 = data);
    this.datUsuario.pokemonPeleandoj2$.subscribe(data => this.pokemonPeleandoj2 = data);
  }

  bajarvida(){
    this.j1.pokemons[this.pokemonPeleandoj1].vidaActual -=10;
  };

  cambiarPokemon(){
    this.datUsuario.cambiarPokej1(1);
  }
}
