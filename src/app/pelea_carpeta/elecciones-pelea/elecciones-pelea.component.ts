import { Component } from '@angular/core';
import { jugador } from 'src/app/Clases/jugador.model';
import { UsuariosService } from 'src/app/usuarios.service';

@Component({
  selector: 'app-elecciones-pelea',
  templateUrl: './elecciones-pelea.component.html',
  styleUrls: ['./elecciones-pelea.component.css']
})
export class EleccionesPeleaComponent {

  j1:jugador;
  j2:jugador;

  constructor(private datUsuario:UsuariosService){
    this.j1=datUsuario.jugador1;
    this.j2=datUsuario.jugador2;
  }

  bajarvida(){
    this.j1.pokemons[0].vidaActual -=10;
  };

}
