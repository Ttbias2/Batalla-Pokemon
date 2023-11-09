import { Component, OnInit } from '@angular/core';
import { jugador } from 'src/app/Clases/jugador.model';
import { UsuariosService } from '../../../services/usuarios.service';

@Component({
  selector: 'app-campo-de-batalla',
  templateUrl: './campo-de-batalla.component.html',
  styleUrls: ['./campo-de-batalla.component.css']
})
export class CampoDeBatallaComponent implements OnInit{

  j1:jugador;
  j2:jugador;
  pokemonPeleandoj1:number;
  pokemonPeleandoj2:number;

  constructor(private datJugadores:UsuariosService){
    this.j1 = datJugadores.jugador1;
    this.j2 = datJugadores.jugador2;
  }
  ngOnInit(): void {
    this.datJugadores.pokemonPeleandoj1$.subscribe(data => this.pokemonPeleandoj1 = data);
    this.datJugadores.pokemonPeleandoj2$.subscribe(data => this.pokemonPeleandoj2 = data);
  }

}
