import { Component } from '@angular/core';
import { UsuariosService } from '../usuarios.service';
import { jugador } from '../Clases/jugador.model';

@Component({
  selector: 'app-equipos',
  templateUrl: './equipos.component.html',
  styleUrls: ['./equipos.component.css']
})
export class EquiposComponent{
  
  j1:jugador = new jugador();
  j2:jugador = new jugador();

  constructor(private datUsuario:UsuariosService){
    this.j1 = this.datUsuario.jugador1;
    this.j2 = this.datUsuario.jugador2;
  }
  
  iniciarPelea(){
    if(this.datUsuario.pasos>=7){

    }
    else{
      alert("Tienen que elegir todos los pokemons para poder peleart");
    }
  }
  


  

}
