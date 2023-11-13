import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosDbService } from 'src/app/services/usuarios-db.service';

@Component({
  selector: 'app-eleccion',
  templateUrl: './eleccion.component.html',
  styleUrls: ['./eleccion.component.css']
})
export class EleccionComponent {

  constructor(
    private router:Router,
    private usuarioDBService:UsuariosDbService
  ){}

  ngOnInit(): void {
    if(-1 == this.usuarioDBService.obtenerId()){
      this.router.navigate([""]);
    }
    
  }
}
