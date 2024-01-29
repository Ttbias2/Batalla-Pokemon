import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-ingresar-jugadores',
  templateUrl: './ingresar-jugadores.component.html',
  styleUrls: ['./ingresar-jugadores.component.css']
})
export class IngresarJugadoresComponent {

  constructor(private router:Router,
      private usuarioService: UsuariosService){

  }

  j1='';
  j2='';
  

  jugar(){
    this.usuarioService.setNombres(this.j1,this.j2);
    this.router.navigate(['eleccion']);
  }
}
