import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosDbService } from 'src/app/services/usuarios-db.service';

@Component({
  selector: 'app-page-menu',
  templateUrl: './page-menu.component.html',
  styleUrls: ['./page-menu.component.css']
})
export class PageMenuComponent implements OnInit{

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
