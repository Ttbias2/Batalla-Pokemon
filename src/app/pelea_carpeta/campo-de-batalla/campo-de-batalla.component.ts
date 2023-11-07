import { Component } from '@angular/core';
import { jugador } from 'src/app/Clases/jugador.model';
import { UsuariosService } from 'src/app/usuarios.service';

@Component({
  selector: 'app-campo-de-batalla',
  templateUrl: './campo-de-batalla.component.html',
  styleUrls: ['./campo-de-batalla.component.css']
})
export class CampoDeBatallaComponent {

  j1:jugador;
  j2:jugador;

  constructor(private datJugadores:UsuariosService){
    this.j1 = datJugadores.jugador1;
    this.j2 = datJugadores.jugador2;
  }

}
